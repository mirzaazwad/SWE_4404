const express=require('express');
const router=express.Router();
const {makePayment} = require('../controller/ssl-commerz-make-payment');


router.get('/purchase',makePayment);


module.exports = router;