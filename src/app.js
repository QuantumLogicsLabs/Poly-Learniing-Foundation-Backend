const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const apiRoutes = require('./routes');
const { ensureDb } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const isProd = process.env.NODE_ENV === 'production';

// Behind Vercel's proxy, trust X-Forwarded-For so rate limiting sees each visitor's real IP
// (otherwise every visitor would share one limit). Elsewhere, only when TRUST_PROXY is set.
if (process.env.VERCEL || process.env.TRUST_PROXY) app.set('trust proxy', Number(process.env.TRUST_PROXY) || 1);

// CLIENT_ORIGIN is a comma-separated list; "*" works as a wildcard,
// e.g. "https://plf.vercel.app,https://plf-*-myteam.vercel.app" to also allow preview deployments.
const allowed = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim().replace(/\/$/, ''))
  .filter(Boolean)
  .map((o) => new RegExp('^' + o.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^/]*') + '$'));

app.use(helmet());
app.use(
  cors({
    origin(origin, done) {
      // Requests without an Origin header (curl, server-to-server, same-origin) are allowed.
      done(null, !origin || allowed.some((re) => re.test(origin)));
    },
  })
);
app.use(express.json({ limit: '20kb' }));
app.use(morgan(isProd ? 'tiny' : 'dev'));

app.get('/', (req, res) => res.json({ name: 'Poly Learning Foundation API', docs: '/api/health' }));
app.use('/api', ensureDb, apiRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
