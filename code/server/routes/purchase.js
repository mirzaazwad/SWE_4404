const express=require('express');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();
const SSLCommerz = require('../controller/ssl-commerz-make-payment');
const payment=require('../controller/payment');


// router.use(requireAuth);
router.post('/success/order/:oid/pharmacy/:pid',payment.successfulPayment);
router.post('/fail',payment.failedPayment);
router.post('/ipn',payment.instantPaymentNotification);
router.post('/cancel',payment.cancelPayment);


module.exports = router;