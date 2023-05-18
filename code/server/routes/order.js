const express = require('express');
const orderController = require('../controller/order');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
// POST /postOrder/:userId
router.post('/postOrder/:userId', orderController.postOrder);

// GET /getOrder/:userId
router.get('/getOrder/:userId', orderController.getOrder);

router.get('/getOrderDetails/:userId/:orderId', orderController.getOrderDetails);
router.patch('/billingOrder/:userId/:orderId', orderController.billingOrder);

module.exports = router;
