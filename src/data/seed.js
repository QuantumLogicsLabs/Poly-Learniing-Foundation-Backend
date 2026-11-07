const Project = require('../models/Project');
const Role = require('../models/Role');
const projects = require('./projects');
const roles = require('./roles');

// Upsert by slug so re-seeding updates content without duplicating it.
async function upsertAll(Model, docs) {
  if (!docs.length) return 0;
  const ops = docs.map((doc) => ({ updateOne: { filter: { slug: doc.slug }, update: { $set: doc }, upsert: true } }));
  const res = await Model.bulkWrite(ops);
  return res.upsertedCount + res.modifiedCount;
}

async function seedAll() {
  const p = await upsertAll(Project, projects);
  const r = await upsertAll(Role, roles);
  return { projects: p, roles: r };
}

// Called on every successful connection: fills an empty database, never overwrites edits.
async function seedIfEmpty() {
  const [pc, rc] = await Promise.all([Project.estimatedDocumentCount(), Role.estimatedDocumentCount()]);
  if (pc === 0) await Project.insertMany(projects);
  if (rc === 0) await Role.insertMany(roles);
  if (pc === 0 || rc === 0) console.log(`[db] seeded empty collections (projects: ${pc === 0}, roles: ${rc === 0})`);
}

module.exports = { seedAll, seedIfEmpty };
