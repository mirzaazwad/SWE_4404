const express=require('express');
const { loginUser, signUpUser,forgot,verifyEmail,verifyOTP} = require('../controller/user-login-signup-controller');
const router=express.Router();

router.post('/login',loginUser);
router.post('/signUp',signUpUser);
router.get('/forgot/:email',forgot);
router.get('/verifyEmail/:email',verifyEmail);
router.post('verifyOTP',verifyOTP);

module.exports = router;