const Order = require('../model/order');
const Pharmacy = require('../model/pharmacy');
const { makePayment } = require('./ssl-commerz-make-payment');

const postOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
    const items = req.body.items;
    const customer_data = req.body.customer_data;

    const order = await Order.findOne({
      userId: userId
    });
    const pharmacy = await Pharmacy.findOne({
      pharmacyManagerID: req.body.customer_data.pharmacyManagerID
    });

    if (order) {
      order.order_data.push({
        date: new Date(),
        medicines: items,
        customer_data: customer_data
      });
      await order.save();
      pharmacy.Orders.push({
        orderId : order._id.toString(),
        date: new Date(),
        medicines: items,
        customer_data: customer_data
  });
  await pharmacy.save();
  if(customer_data.payment==="Digital Payment"){
    const result=await makePayment(customer_data,order._id.toString());
    if(result){
      return res.status(200).json({paymentSuccessful:true,url:result});
    }
    else{
      throw Error('Digital Payment Failed due to gateway error');
    }
  }
    } else {
      const newOrder = new Order({
        userId,
        order_data: [{
          date: new Date(),
          medicines: items,
          customer_data: customer_data
        }]
      });

      await newOrder.save();
      pharmacy.Orders.push({
        orderId : newOrder._id.toString(),
        date: new Date(),
        medicines: items,
        customer_data: customer_data
  });
  await pharmacy.save();
  if(customer_data.payment==="Digital Payment"){
    const result=await makePayment(customer_data,newOrder._id.toString());
    if(result){
      return res.status(200).json({paymentSuccessful:true,url:result});
    }
    else{
      throw Error('Digital Payment Failed due to gateway error');
    }
  }
    }
    return res.status(200).json({paymentSuccessful:false,type:'cash',url:null});
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const order = await Order.findOne({
      userId: userId
    });

    if (!order) {
      console.log("order not found");
      return res.status(404).json({
        error: 'Order not found'
      });
    }

    return res.status(200).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: 'Server error'
    });
  }
};

const getOrderDetails = async (req, res) => {
  const {
    userId,
    orderId
  } = req.params;

  try {
    // Find the order with the given order ID and user ID
    const order = await Order.findOne({
      userId: userId
    });
    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    // Get the specific order data that matches the order ID
    const orderData = order.order_data.find(data => data._id.toString() === orderId);
    console.log(orderData);
    return res.status(200).json({
      order: orderData
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server Error'
    });
  }
};



module.exports = {
  postOrder,
  getOrder,
  getOrderDetails
};