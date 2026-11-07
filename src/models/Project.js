const { Schema, model } = require('mongoose');

const featureSchema = new Schema({ title: { type: String, required: true }, text: { type: String, required: true } }, { _id: false });
const componentSchema = new Schema({ name: { type: String, required: true }, text: { type: String, required: true } }, { _id: false });

const projectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    tagline: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    accent: { type: String, default: '#8B7CF6' },
    url: { type: String },
    image: { type: String },
    status: { type: String, enum: ['live', 'beta', 'planned'], default: 'live' },
    highlights: [{ type: String }],
    stack: [{ type: String }],
    features: [featureSchema],
    components: [componentSchema],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = model('Project', projectSchema);
