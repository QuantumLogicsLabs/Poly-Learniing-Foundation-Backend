const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const { isConnected } = require('../config/db');
const { allowedOrigins } = require('../config/cors');
const requireDb = require('../middleware/requireDb');
const requireAdmin = require('../middleware/requireAdmin');
const { listProjects, getProject } = require('../controllers/projectController');
const { listRoles, getRole } = require('../controllers/roleController');
const { createInquiry } = require('../controllers/inquiryController');
const { subscribe } = require('../controllers/subscriberController');
const { listInquiries, listSubscribers } = require('../controllers/adminController');

const router = Router();

// Forms are public, so limit how often one client can post.
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many submissions from this device. Please try again in a few minutes.' },
});

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    database: isConnected() ? 'connected' : 'offline',
    // Origins are public information (they are the website's own URLs); shown here so a
    // CLIENT_ORIGIN typo can be spotted without digging through Vercel settings.
    allowedOrigins,
    time: new Date().toISOString(),
  });
});

router.get('/foundation', (req, res) => {
  res.json({
    data: {
      name: 'Poly Learning Foundation',
      type: 'Non-profit organization',
      mission: 'We invent jobs: we build free learning platforms, turn each one into new kinds of work, and train people to do that work.',
    },
  });
});

router.get('/projects', listProjects);
router.get('/projects/:slug', getProject);

router.get('/roles', listRoles);
router.get('/roles/:slug', getRole);

router.post('/inquiries', formLimiter, requireDb, createInquiry);
router.post('/subscribers', formLimiter, requireDb, subscribe);

router.get('/admin/inquiries', requireAdmin, requireDb, listInquiries);
router.get('/admin/subscribers', requireAdmin, requireDb, listSubscribers);

module.exports = router;
