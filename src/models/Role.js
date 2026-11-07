const { Schema, model } = require('mongoose');

// A "role" is a kind of work one of our platforms creates - the jobs we invent.
const roleSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    project: { type: String, required: true, index: true }, // project slug, or "foundation"
    track: { type: String, enum: ['Content', 'Engineering', 'AI & ML', 'Security', 'Community'], required: true },
    summary: { type: String, required: true },
    skills: [{ type: String }],
    pathway: [{ type: String }], // how a learner grows into the role
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = model('Role', roleSchema);
