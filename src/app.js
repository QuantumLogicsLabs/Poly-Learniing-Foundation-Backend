const express = require('express');
const helmet = require('helmet');
const { corsMiddleware } = require('./config/cors');
const morgan = require('morgan');
const apiRoutes = require('./routes');
const { ensureDb } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const isProd = process.env.NODE_ENV === 'production';

// Behind Vercel's proxy, trust X-Forwarded-For so rate limiting sees each visitor's real IP
// (otherwise every visitor would share one limit). Elsewhere, only when TRUST_PROXY is set.
if (process.env.VERCEL || process.env.TRUST_PROXY) app.set('trust proxy', Number(process.env.TRUST_PROXY) || 1);

// The API is consumed from a different origin (the frontend's own Vercel project),
// so its responses must be readable cross-origin. Allowed origins: see src/config/cors.js.
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(corsMiddleware);
app.use(express.json({ limit: '20kb' }));
app.use(morgan(isProd ? 'tiny' : 'dev'));

app.get('/', (req, res) => res.json({ name: 'Poly Learning Foundation API', docs: '/api/health' }));
app.use('/api', ensureDb, apiRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
