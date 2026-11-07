// Local development entry point. On Vercel the app is served by api/index.js instead.
require('dotenv').config();
const app = require('./src/app');
const { connectDb } = require('./src/config/db');

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Poly Learning Foundation API listening on http://localhost:${PORT}/api`);
  // Warm the connection. If MongoDB is unreachable the API still answers: reads use the
  // built-in data, forms answer 503, and each request retries the connection (with back-off).
  connectDb();
});
