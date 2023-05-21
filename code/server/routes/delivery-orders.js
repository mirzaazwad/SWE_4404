const express=require('express');
const delivery = require('../controller/delivery');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
router.get('/',delivery.getOrdersToDeliver);
router.patch('/addOrder/:id',delivery.addOrder);
router.patch('/updateOrder/:id',delivery.updateOrder);

module.exports = router;