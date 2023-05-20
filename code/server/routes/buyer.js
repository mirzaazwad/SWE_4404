const express=require('express');
const buyer = require('../controller/profile-buyer');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
router.get('/:id',buyer.getBuyerById);
router.patch('/:id',buyer.patchBuyerById);

module.exports = router;