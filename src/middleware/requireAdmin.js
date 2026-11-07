const crypto = require('crypto');
const HttpError = require('../utils/httpError');

const digest = (value) => crypto.createHash('sha256').update(String(value)).digest();

// Bearer-token guard for the read-only admin endpoints. Disabled when ADMIN_TOKEN is empty.
module.exports = function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return next(new HttpError(404, 'Not found'));
  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token || !crypto.timingSafeEqual(digest(token), digest(expected))) {
    return next(new HttpError(401, 'Invalid or missing admin token'));
  }
  next();
};
