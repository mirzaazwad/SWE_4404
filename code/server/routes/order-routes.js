const express = require('express');
const router = express.Router();
const orderController = require('../controller/order-controller');

// POST /postOrder/:userId
router.post('/postOrder/:userId', orderController.postOrder);

// GET /getOrder/:userId
router.get('/getOrder/:userId', orderController.getOrder);

router.get('/getOrderDetails/:userId/:orderId', orderController.getOrderDetails);
module.exports = router;
