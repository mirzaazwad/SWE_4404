const express = require('express');
const router = express.Router();
const pharmacyController = require('../../controller/viewPharmacyController');

// Get all pharmacies
router.get('/', pharmacyController.getAllPharmacies);

module.exports = router;