const express=require('express');
const {findUser} = require('../../controller/loginSignUp/loginController');
const router=express.Router();

router.post('/',findUser);

module.exports = router;