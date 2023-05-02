const express = require('express');
const router = express.Router();
const pharmacyController = require('../controller/view-pharmacy');

// Get all pharmacies
router.get('/', pharmacyController.getAllPharmacies);

module.exports = router;