const Subscriber = require('../models/Subscriber');
const HttpError = require('../utils/httpError');
const { str, isEmail } = require('../utils/validate');

// POST /api/subscribers - idempotent: subscribing twice is not an error.
async function subscribe(req, res) {
  const email = str(req.body?.email).toLowerCase();
  if (!isEmail(email)) throw new HttpError(400, 'Please enter a valid email address.', { email: 'Please enter a valid email address.' });

  const result = await Subscriber.updateOne({ email }, { $setOnInsert: { email } }, { upsert: true });
  const created = result.upsertedCount === 1;
  res.status(created ? 201 : 200).json({
    message: created ? 'You are subscribed. Welcome to the foundation!' : 'You are already subscribed — thank you!',
  });
}

module.exports = { subscribe };
