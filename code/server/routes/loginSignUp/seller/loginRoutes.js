const express=require('express');
const {findUser} = require('../../../controller/loginSignUp/seller/loginController');
const router=express.Router();

router.post('/',findUser);
router.get('auth/google')

module.exports = router;