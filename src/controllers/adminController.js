const Inquiry = require('../models/Inquiry');
const Subscriber = require('../models/Subscriber');

const limitFrom = (q) => Math.min(Math.max(parseInt(q, 10) || 50, 1), 500);

async function listInquiries(req, res) {
  const filter = {};
  if (typeof req.query.type === 'string') filter.type = req.query.type;
  if (typeof req.query.status === 'string') filter.status = req.query.status;
  const data = await Inquiry.find(filter).sort({ createdAt: -1 }).limit(limitFrom(req.query.limit)).lean();
  res.json({ data, count: data.length });
}

async function listSubscribers(req, res) {
  const data = await Subscriber.find().sort({ createdAt: -1 }).limit(limitFrom(req.query.limit)).lean();
  res.json({ data, count: data.length });
}

module.exports = { listInquiries, listSubscribers };
