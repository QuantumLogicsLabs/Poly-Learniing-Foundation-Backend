const HttpError = require('../utils/httpError');

function notFound(req, res, next) {
  next(new HttpError(404, `No route for ${req.method} ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || 'Something went wrong';
  let details = err.details;

  if (err.name === 'ValidationError') {
    status = 400;
    message = 'Please check the highlighted fields.';
    details = Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, v.message]));
  } else if (err.code === 11000) {
    status = 409;
    message = 'That record already exists.';
  } else if (err.type === 'entity.parse.failed') {
    status = 400;
    message = 'Request body is not valid JSON.';
  } else if (err.type === 'entity.too.large') {
    status = 413;
    message = 'Request body is too large.';
  }

  // Only hide messages of unexpected errors; deliberate HttpErrors (e.g. 503 "database
  // unavailable") carry text written for the visitor.
  const unexpected = !(err instanceof HttpError) && status >= 500;
  if (unexpected) console.error('[error]', err);
  res.status(status).json({ error: unexpected && process.env.NODE_ENV === 'production' ? 'Internal server error' : message, ...(details && { details }) });
}

module.exports = { notFound, errorHandler };
