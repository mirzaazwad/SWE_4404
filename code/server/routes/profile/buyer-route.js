const express=require('express');
const {getBuyerByEmail, patchBuyerByEmail} = require('../../controller/profile-controller');
const router=express.Router();

router.get('/:email',getBuyerByEmail);
router.patch('/:email',patchBuyerByEmail);

module.exports = router;