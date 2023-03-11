const express=require('express');
const {getSellerByEmail, patchSellerByEmail} = require('../../controller/profile-controller');
const router=express.Router();

router.get('/:email',getSellerByEmail);
router.patch('/:email',patchSellerByEmail);

module.exports = router;