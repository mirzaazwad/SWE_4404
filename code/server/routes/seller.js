const express=require('express');
const seller = require('../controller/profile');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
router.get('/:email',seller.getSellerByEmail);
router.patch('/:email',seller.patchSellerByEmail);

module.exports = router;