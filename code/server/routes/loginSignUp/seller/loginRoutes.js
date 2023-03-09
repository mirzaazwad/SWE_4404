const express=require('express');
const {findUser} = require('../../../controller/loginSignUp/seller/loginController');
const router=express.Router();

router.post('/',findUser);

module.exports = router;