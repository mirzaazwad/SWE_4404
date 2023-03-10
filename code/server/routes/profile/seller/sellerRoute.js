const express=require('express');
const {getUserByID , updateUser} = require('../../../controller/profile/seller/profileController');
const router=express.Router();

router.get('/:id',getUserByID);

router.patch('/:id',updateUser);

module.exports = router;