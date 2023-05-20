const express = require('express');
const pharmacyOrderController = require('../controller/pharmacy-order');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);

router.get('/getOrder/:userId', pharmacyOrderController.getOrder);
router.get('/getOrderDetails/:userId/:orderId', pharmacyOrderController.getOrderDetails);
module.exports = router;