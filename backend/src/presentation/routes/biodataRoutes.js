const express = require('express');
const router = express.Router();
const biodataController = require('../controllers/BiodataController');
const { authenticate } = require('../middlewares/authMiddleware');
const { biodataValidator } = require('../validators/biodataValidator');
const { handleValidationErrors } = require('../middlewares/errorMiddleware');

// All routes require authentication
router.use(authenticate);

// GET /api/biodata/me
router.get('/me', biodataController.getMyBiodata.bind(biodataController));

// POST /api/biodata
router.post('/', biodataValidator, handleValidationErrors, biodataController.createBiodata.bind(biodataController));

// PUT /api/biodata/:id
router.put('/:id', biodataValidator, handleValidationErrors, biodataController.updateBiodata.bind(biodataController));

// DELETE /api/biodata/:id
router.delete('/:id', biodataController.deleteBiodata.bind(biodataController));

module.exports = router;
