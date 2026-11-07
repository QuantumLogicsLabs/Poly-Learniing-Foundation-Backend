const mongoose = require('mongoose');
const { seedIfEmpty } = require('../data/seed');

// After a failed attempt, wait this long before trying again so requests are not
// each stalled by a 5 s server-selection timeout while the database is down.
const RETRY_AFTER_MS = 15000;

// Fail fast instead of buffering queries when the database is down.
mongoose.set('bufferCommands', false);
mongoose.set('strictQuery', true);

// Cache on globalThis so warm Vercel function invocations (and `node --watch` reloads)
// reuse one connection instead of opening a new one per request.
const cache = globalThis.__plfMongo || (globalThis.__plfMongo = { promise: null, failedAt: 0, warned: false });

const isConnected = () => mongoose.connection.readyState === 1;

/**
 * Connects (once) and seeds empty collections. Resolves to true when connected, false otherwise.
 * Never throws: callers fall back to the built-in data when it resolves to false.
 */
async function connectDb() {
  if (isConnected()) return true;
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    if (!cache.warned) console.warn('[db] MONGODB_URI is not set - serving built-in data only (forms are disabled).');
    cache.warned = true;
    return false;
  }
  if (!cache.promise) {
    if (Date.now() - cache.failedAt < RETRY_AFTER_MS) return false;
    cache.promise = mongoose
      .connect(uri, { serverSelectionTimeoutMS: 5000, maxPoolSize: 5 })
      .then(async () => {
        console.log(`[db] connected to ${mongoose.connection.host}/${mongoose.connection.name}`);
        await seedIfEmpty();
        return true;
      })
      .catch((err) => {
        console.warn(`[db] connection failed (${err.message}); serving built-in data and retrying later.`);
        cache.promise = null;
        cache.failedAt = Date.now();
        return false;
      });
  }
  const ok = await cache.promise;
  if (!ok || !isConnected()) cache.promise = null; // dropped connection: allow a fresh attempt
  return ok && isConnected();
}

// Express middleware: make sure we have tried to connect before handling the request.
async function ensureDb(req, res, next) {
  await connectDb();
  next();
}

module.exports = { connectDb, ensureDb, isConnected };
