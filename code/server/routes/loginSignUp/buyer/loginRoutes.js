const express=require('express');
const {findUser} = require('../../../controller/loginSignUp/buyer/loginController');
const router=express.Router();

router.post('/',findUser);

module.exports = router;