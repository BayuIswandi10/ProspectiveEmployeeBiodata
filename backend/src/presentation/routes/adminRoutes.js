const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// All admin routes require authentication + admin role
router.use(authenticate, authorize('admin'));

// GET /api/admin/candidates
router.get('/candidates', adminController.getAllCandidates.bind(adminController));

// GET /api/admin/candidates/:id
router.get('/candidates/:id', adminController.getCandidateDetail.bind(adminController));

// DELETE /api/admin/candidates/:id
router.delete('/candidates/:id', adminController.deleteCandidate.bind(adminController));

module.exports = router;
