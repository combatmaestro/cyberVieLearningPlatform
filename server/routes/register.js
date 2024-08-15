const express = require('express');
const { saveFormData, getAllFormData } = require('../controllers/registerController');

const router = express.Router();

// Route to save form data
router.post('/save-form-data', saveFormData);

// Route to get all form data
router.get('/get-all-form-data', getAllFormData);

module.exports = router;
