const express = require('express');
const router = express.Router();
const pharmacyController = require('../../controller/medicinesOfPharmacyController');

router.get('/:id', pharmacyController.getAllMedicines);

module.exports = router;