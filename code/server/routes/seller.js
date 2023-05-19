const express=require('express');
const seller = require('../controller/profile-seller');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
router.get('/:_id',seller.getSellerById);
router.patch('/:_id',seller.patchSellerById);

module.exports = router;