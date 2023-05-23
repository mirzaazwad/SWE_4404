const express=require('express');
const delivery = require('../controller/profile-delivery');
const ongoing = require('../controller/ongoing-delivery');
const history = require('../controller/history-delivery.js');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
router.get('/:id',delivery.getDeliveryById);
router.patch('/:id',delivery.patchDeliveryById);
router.get('/ongoing/:id',ongoing.onGoingDeliveries);
router.get('/history/:id',history.deliveryHistory);
router.get('/getdelivery/:id',delivery.getDeliveryByOrderID);
router.get('/getdeliveryAndMan/:id',delivery.getDeliveryAndManByOrderID);

module.exports = router;