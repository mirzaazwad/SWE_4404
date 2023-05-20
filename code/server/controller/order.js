const Order = require('../model/order');
const Pharmacy = require('../model/seller');
const { MakePayment } = require('../Library/ssl-commerz-make-payment');

const updateExistingCustomerOrder = async(order,pharmacy,items,customer_data,prescriptionBasedOrder)=>{
  order.order_data.push({
    date: new Date(),
    medicines: items,
    customer_data: customer_data,
    prescriptionBasedOrder: prescriptionBasedOrder
  });
  await order.save();
  pharmacy.Orders.push({
    _id : order.order_data[order.order_data.length-1]._id,
    date: new Date(),
    medicines: items,
    customer_data: customer_data,
    prescriptionBasedOrder: prescriptionBasedOrder
  });
  await pharmacy.save();
  return order;
}

const commenceDigitalPayment = async(customer_data,orderID)=>{
  try{
    const makePayment=new MakePayment(customer_data,orderID,'BDT');
    const result=await makePayment.makePaymentRequest();
    return {paymentSuccessful:true,url:result};
  }
  catch(error){
    return {paymentSuccessful:false,url:result};
  }
}

const newCustomerOrder = async(userId,pharmacy,items,customer_data,prescriptionBasedOrder)=>{
  const newOrder = await new Order({
    userId,
    order_data: [{
      date: new Date(),
      medicines: items,
      customer_data: customer_data,
      prescriptionBasedOrder: prescriptionBasedOrder
    }]
  });
  await newOrder.save();
  const order = await Order.findOne({
    userId: userId
  });
  pharmacy.Orders.push({
    _id : order.order_data[0]._id,
    date: new Date(),
    medicines: items,
    customer_data: customer_data,
    prescriptionBasedOrder: prescriptionBasedOrder
  });
  await pharmacy.save();
  return order;
}

const postOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { userId, "order_data._id": orderId },
      {
        $set: {
          "order_data.$.customer_data": customer_data ,
        },
      },
      { new: true }
    );
    const pharmacy = await Pharmacy.findOneAndUpdate(
      { pharmacyManagerID: customer_data.pharmacyManagerID, "Orders._id": orderId },
      {
        $set: {
          "Orders.$.customer_data": customer_data ,
        },
      },
      { new: true }
    );
    cashResponse={paymentSuccessful:false,type:'cash',url:null}
    if(customer_data.payment==="Digital Payment"){
      const result=await commenceDigitalPayment(customer_data,order.order_data[order.order_data.length-1]._id.toString());
      return result.paymentSuccessful?res.status(200).json(result):res.status(400).json(result);
    }
    else{
      return res.status(200).json(cashResponse);
    }
  } catch (err) {
    return res.status(400).json({error: err.message});
  }
};

const getOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
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