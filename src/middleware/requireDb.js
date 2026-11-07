const { isConnected } = require('../config/db');
const HttpError = require('../utils/httpError');

// Write endpoints need a real database; reads fall back to built-in data instead.
module.exports = function requireDb(req, res, next) {
  if (!isConnected()) {
    return next(new HttpError(503, 'Our database is temporarily unavailable, so we could not save this. Please try again in a few minutes.'));
  }
  next();
};
