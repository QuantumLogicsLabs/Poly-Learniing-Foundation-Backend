const Inquiry = require('../models/Inquiry');
const Role = require('../models/Role');
const HttpError = require('../utils/httpError');
const { str, isEmail, check } = require('../utils/validate');

const { INQUIRY_TYPES } = Inquiry;

// POST /api/inquiries - role applications, volunteering, partnerships, donations, general contact.
async function createInquiry(req, res) {
  const body = req.body || {};

  // Honeypot: real people never see or fill the "website" field.
  if (str(body.website)) return res.status(201).json({ message: 'Thanks! We will be in touch soon.' });

  const input = {
    type: str(body.type) || 'general',
    name: str(body.name),
    email: str(body.email).toLowerCase(),
    organization: str(body.organization) || undefined,
    role: str(body.role).toLowerCase() || undefined,
    message: str(body.message),
  };

  const errors = check({
    type: [INQUIRY_TYPES.includes(input.type), 'Choose what you are getting in touch about.'],
    name: [input.name.length >= 2 && input.name.length <= 120, 'Please tell us your name.'],
    email: [isEmail(input.email), 'Please enter a valid email address.'],
    message: [input.message.length >= 10 && input.message.length <= 4000, 'Please write at least a sentence (10+ characters).'],
    role: [input.type !== 'apply' || Boolean(input.role), 'Pick the role you are applying for.'],
  });
  if (errors) throw new HttpError(400, 'Please check the highlighted fields.', errors);

  if (input.type === 'apply' && !(await Role.exists({ slug: input.role }))) {
    throw new HttpError(400, 'Please check the highlighted fields.', { role: 'That role does not exist.' });
  }

  const inquiry = await Inquiry.create(input);
  res.status(201).json({ message: 'Thanks! We received your message and will reply by email.', id: inquiry._id });
}

module.exports = { createInquiry };
