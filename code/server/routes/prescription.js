const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();
const prescriptionController = require('../controller/prescription');

router.use(requireAuth);

router.patch('/uploadPrescription/:id',prescriptionController.uploadPrescription);
router.get('/getPrescriptions/:id',prescriptionController.getPrescriptions);

module.exports = router;