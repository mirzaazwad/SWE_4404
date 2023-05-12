const express=require('express');
const requireAuth = require('../middleware/requireAuth');
const OTPHandler = require('../controller/mobile');
const router=express.Router();
router.use(requireAuth);

router.post('/OTPsend',OTPHandler.sendOTP);
router.post('/OTPverify',OTPHandler.verifyOTP);

module.exports = router;