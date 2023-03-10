const express=require('express');
const {getUserByID, patchUserByID} = require('../../../controller/profile/seller/profileController');
const router=express.Router();

router.get('/:id',getUserByID);
router.patch('/:id',patchUserByID);

module.exports = router;