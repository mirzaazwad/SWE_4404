const express=require('express');
const {buyerGet:getUserByEmail} = require('../../controller/loginSignUp/seller/signUpController');
const {sellerGet:getUserByEmail} = require('../../controller/loginSignUp/buyer/signUpController');
const router=express.Router();

router.get('/buyer/:email',buyerGet);
router.get('/seller/:email',sellerGet);
