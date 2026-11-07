const Project = require('../models/Project');
const Role = require('../models/Role');
const { isConnected } = require('../config/db');
const HttpError = require('../utils/httpError');
const staticProjects = require('../data/projects');
const staticRoles = require('../data/roles');

const HIDDEN = '-__v -createdAt -updatedAt';
const byOrder = (a, b) => a.order - b.order;

async function listProjects(req, res) {
  if (!isConnected()) {
    res.set('X-Data-Source', 'static');
    return res.json({ data: [...staticProjects].sort(byOrder) });
  }
  const data = await Project.find().sort({ order: 1 }).select(HIDDEN).lean();
  res.json({ data });
}

async function getProject(req, res) {
  const slug = String(req.params.slug).toLowerCase();
  let project;
  let roles;
  if (!isConnected()) {
    res.set('X-Data-Source', 'static');
    project = staticProjects.find((p) => p.slug === slug);
    roles = staticRoles.filter((r) => r.project === slug).sort(byOrder);
  } else {
    project = await Project.findOne({ slug }).select(HIDDEN).lean();
    roles = project ? await Role.find({ project: slug }).sort({ order: 1 }).select(HIDDEN).lean() : [];
  }
  if (!project) throw new HttpError(404, 'Project not found');
  res.json({ data: { ...project, roles } });
}

module.exports = { listProjects, getProject };
