const express=require('express');
const { loginUser, signUpUser,forgot } = require('../controller/user-login-signup-controller');
const router=express.Router();

router.post('/login',loginUser);
router.post('/signUp',signUpUser);
router.get('/forgot/:email',forgot);

module.exports = router;