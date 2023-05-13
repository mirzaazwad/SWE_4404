const express=require('express');
const router=express.Router();
const payment=require('../controller/payment');

router.post('/success/order/:oid/pharmacy/:pid',payment.successfulPayment);
router.post('/fail/order/:oid/pharmacy/:pid',payment.failedPayment);
router.post('/ipn/order/:oid/pharmacy/:pid',payment.instantPaymentNotification);
router.post('/cancel/order/:oid/pharmacy/:pid',payment.cancelPayment);


module.exports = router;