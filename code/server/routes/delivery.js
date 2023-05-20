const express=require('express');
const delivery = require('../controller/profile-delivery');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
router.get('/:id',delivery.getDeliveryById);
router.patch('/:id',delivery.patchDeliveryById);

module.exports = router;