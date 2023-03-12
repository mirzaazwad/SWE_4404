const express=require('express');
const requireAuth = require('../middleware/requireAuth');
const { loginUser, signUpUser,forgot,verifyEmail,verifyOTP,verifySignUpInformation,deleteOTP,updatePassword} = require('../controller/user-login-signup-controller');
const router=express.Router();

router.post('/login',loginUser);
router.post('/signUp',signUpUser);
router.get('/forgot/:email',forgot);
router.post('/forgot/verifyOTP',verifyOTP);
router.patch('/forgot/updatePassword/:email',updatePassword);


router.use(requireAuth);
router.get('/verifyEmail/:email',verifyEmail);
router.post('/verifyOTP',verifyOTP);
router.patch('/verifyEmail/:email',verifySignUpInformation);
router.delete('/deleteOTP/:email',deleteOTP);

module.exports = router;