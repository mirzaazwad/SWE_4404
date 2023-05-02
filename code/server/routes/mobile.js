const express=require('express');
const requireAuth = require('../middleware/requireAuth');
const {sendOTP,verifyOTP} = require('../controller/mobile');
const router=express.Router();
router.use(requireAuth);

router.post('/OTPsend',sendOTP);
router.post('/OTPverify',verifyOTP);

module.exports = router;