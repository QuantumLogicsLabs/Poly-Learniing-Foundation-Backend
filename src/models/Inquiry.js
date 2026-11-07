const { Schema, model } = require('mongoose');

const INQUIRY_TYPES = ['apply', 'volunteer', 'partner', 'donate', 'learner', 'general'];

const inquirySchema = new Schema(
  {
    type: { type: String, enum: INQUIRY_TYPES, required: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    organization: { type: String, trim: true, maxlength: 160 },
    role: { type: String, trim: true, maxlength: 80 }, // role slug when type === 'apply'
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    status: { type: String, enum: ['new', 'read', 'archived'], default: 'new' },
  },
  { timestamps: true }
);

module.exports = model('Inquiry', inquirySchema);
module.exports.INQUIRY_TYPES = INQUIRY_TYPES;
