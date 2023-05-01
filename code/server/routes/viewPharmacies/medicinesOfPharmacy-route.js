const express = require('express');
const router = express.Router();
const pharmacyController = require('../../controller/medicinesOfPharmacyController');
const medicineDetailsController = require('../../controller/medicineDetailsController');

router.get('/:id', pharmacyController.getAllMedicines); 
router.get('/:id/medicine/:medicineId', medicineDetailsController.getMedicine);
router.get('/getAllCategories', medicineDetailsController.getAllCategories);

module.exports = router;