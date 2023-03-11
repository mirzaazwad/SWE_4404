const express=require('express');
const { loginUser, signUpUser } = require('../controller/user-login-signup-controller');
const router=express.Router();

router.post('/login',loginUser);
router.post('/signUp',signUpUser);

module.exports = router;