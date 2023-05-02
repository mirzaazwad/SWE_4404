const express = require('express');
const router = express.Router();
const prescriptionController = require('../controller/prescription');

router.patch('/uploadPrescription/:id',prescriptionController.uploadPrescription);
router.get('/getPrescriptions/:id',prescriptionController.getPrescriptions);

module.exports = router;