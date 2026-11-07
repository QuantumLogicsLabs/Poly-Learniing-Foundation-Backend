const { Schema, model } = require('mongoose');

const subscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 200 },
  },
  { timestamps: true }
);

module.exports = model('Subscriber', subscriberSchema);
