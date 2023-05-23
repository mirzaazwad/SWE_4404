const express=require('express');
const delivery = require('../controller/delivery');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
router.get('/',delivery.getOrdersToDeliver);
router.patch('/addOrder/:id',delivery.addOrder);
router.patch('/updateOrder/:id',delivery.updateOrder);
router.patch('/updateComplete/:id',delivery.updateComplete);
router.get('/getstatus/:id',delivery.GetDeliveryStatus);
router.get('/getcompletedstatus/:id',delivery.GetCompletedStatus);
router.patch('/resetStatus/:id',delivery.ResetDeliveryStatus);
router.patch('/resetComplete/:id',delivery.ResetCompleteStatus);
router.patch('/updateorderstatus/:id',delivery.UpdateOrderStatus);
router.patch('/updateorderfail/:id',delivery.UpdateFail);
router.patch('/updatecompletedstatus/:id',delivery.UpdateCompletedStatus);

module.exports = router;