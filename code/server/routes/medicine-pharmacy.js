const express = require('express');
const requireAuth = require('../middleware/requireAuth');

const router=express.Router();
const pharmacyController = require('../controller/medicine-pharmacy');
const medicineDetailsController = require('../controller/medicine-details');
router.get('/getAllCategories', medicineDetailsController.getAllCategories);
router.get('/getAllTypes', medicineDetailsController.getAllTypes);
router.use(requireAuth);

router.get('/:id', pharmacyController.getAllMedicines); 
router.get('/:id/medicine/:medicineId', medicineDetailsController.getMedicine);

module.exports = router;