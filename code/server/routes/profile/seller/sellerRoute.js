const express=require('express');
const {getUserByID} = require('../../../controller/profile/seller/profileController');
const router=express.Router();

router.get('/:id',getUserByID);

module.exports = router;