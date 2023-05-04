const express = require('express');
const requireAuth = require('../middleware/requireAuth');

const router=express.Router();
const pharmacyController = require('../controller/medicine-pharmacy');
const medicineDetailsController = require('../controller/medicine-details');
router.use(requireAuth);

router.get('/:id', pharmacyController.getAllMedicines); 
router.get('/:id/medicine/:medicineId', medicineDetailsController.getMedicine);
router.get('/getAllCategories', medicineDetailsController.getAllCategories);

module.exports = router;