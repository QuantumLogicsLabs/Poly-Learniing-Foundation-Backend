const Role = require('../models/Role');
const { isConnected } = require('../config/db');
const HttpError = require('../utils/httpError');
const staticRoles = require('../data/roles');

const HIDDEN = '-__v -createdAt -updatedAt';

async function listRoles(req, res) {
  const project = typeof req.query.project === 'string' ? req.query.project.toLowerCase() : null;
  if (!isConnected()) {
    res.set('X-Data-Source', 'static');
    const data = staticRoles.filter((r) => !project || r.project === project).sort((a, b) => a.order - b.order);
    return res.json({ data });
  }
  const data = await Role.find(project ? { project } : {}).sort({ order: 1 }).select(HIDDEN).lean();
  res.json({ data });
}

async function getRole(req, res) {
  const slug = String(req.params.slug).toLowerCase();
  const role = isConnected()
    ? await Role.findOne({ slug }).select(HIDDEN).lean()
    : staticRoles.find((r) => r.slug === slug);
  if (!role) throw new HttpError(404, 'Role not found');
  res.json({ data: role });
}

module.exports = { listRoles, getRole };
