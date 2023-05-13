const express=require('express');
const router=express.Router();
const payment=require('../controller/payment');

router.post('/success/order/:oid/pharmacy/:pid/customer/:cname/address/:address',payment.successfulPayment);
router.post('/fail/order/:oid/pharmacy/:pid/customer/:cname/address/:address',payment.failedPayment);
router.post('/ipn/order/:oid/pharmacy/:pid/customer/:cname/address/:address',payment.instantPaymentNotification);
router.post('/cancel/order/:oid/pharmacy/:pid/customer/:cname/address/:address',payment.cancelPayment);


module.exports = router;