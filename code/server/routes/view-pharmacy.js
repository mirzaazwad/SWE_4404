const express = require('express');
const pharmacyController = require('../controller/view-pharmacy');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
// Get all pharmacies
router.get('/', pharmacyController.getAllPharmacies);

module.exports = router;