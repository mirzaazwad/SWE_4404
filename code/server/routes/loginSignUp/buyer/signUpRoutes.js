const express=require('express');
const {createUser,getUserByEmail} = require('../../../controller/loginSignUp/buyer/signUpController');
const {updateUserPhoneNumber} = require('../../../controller/loginSignUp/buyer/signUpPhoneNumber');
const router=express.Router();
router.post('/',createUser);
router.get('/email/:email',getUserByEmail);
router.patch('/phone/:id',updateUserPhoneNumber);

module.exports = router;