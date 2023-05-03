const express=require('express');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();
const {makePayment} = require('../controller/ssl-commerz-make-payment');


// router.use(requireAuth);

router.get('/purchase',makePayment);


module.exports = router;