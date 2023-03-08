const express=require('express');
const {createUser,getUserByEmail} = require('../../../controller/loginSignUp/seller/signUpController');
const { createUserLocation } = require('../../../controller/loginSignUp/seller/signUpLocation');
const {updateUserPhoneNumber} = require('../../../controller/loginSignUp/seller/signUpPhoneNumber');
const router=express.Router();

router.post('/',createUser);
router.get('/email/:email',getUserByEmail);
router.patch('/phone/:id',updateUserPhoneNumber);
router.post('/location',createUserLocation);

module.exports = router;