const express=require('express');
const {getSellerByEmail, patchSellerByEmail} = require('../controller/profile');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
router.get('/:email',getSellerByEmail);
router.patch('/:email',patchSellerByEmail);

module.exports = router;