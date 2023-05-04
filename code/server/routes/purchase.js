const express=require('express');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();
const SSLCommerz = require('../controller/ssl-commerz-make-payment');
const payment=require('../controller/payment');


// router.use(requireAuth);

router.post('/purchase',SSLCommerz.makePayment);
router.post('/success',payment.successfulPayment);
router.post('/fail',payment.failedPayment);
router.post('/ipn',payment.instantPaymentNotification);
router.post('/cancel',payment.cancelPayment);


module.exports = router;