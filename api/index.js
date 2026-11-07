// Vercel serverless entry point: every request is rewritten here (see vercel.json)
// and handled by the Express app. Environment variables come from the Vercel project settings.
module.exports = require('../src/app');
