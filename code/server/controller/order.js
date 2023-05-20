const Order = require('../model/order');
const Pharmacy = require('../model/seller');
const { MakePayment } = require('../Library/ssl-commerz-make-payment');

const updateExistingCustomerOrder = async(order,pharmacy,items,customer_data,prescriptionBasedOrder)=>{
  order.order_data.push({
    date: new Date(),
    medicines: items,
    customer_data: customer_data,
    prescription_image: prescription_image,
  });
  await order.save();

  pharmacy.Orders.push({
    _id : order.order_data[order.order_data.length-1]._id,
    date: new Date(),
    medicines: items,
    customer_data: customer_data,
    prescription_image: prescription_image,
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

const newCustomerOrder = async(userId,pharmacy,items,customer_data,prescription_image)=>{
  const newOrder = new Order({
    userId,
    order_data: [{
      date: new Date(),
      medicines: items,
      customer_data: customer_data,
      prescription_image: prescription_image,
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
    prescription_image: prescription_image,
  });
  await pharmacy.save();
  return order;
}

const billingOrder = async (req, res) => {
  const { userId, orderId } = req.params;
  const { customer_data } = req.body;

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
      { _id: customer_data.pharmacyManagerID, "Orders._id": orderId },
      {
        $set: {
          "Orders.$.customer_data": customer_data ,
        },
      },
      { new: true }
    );
    cashResponse={paymentSuccessful:false,type:'cash',url:null}
    if(customer_data.payment==="Digital Payment"){
      const result=await commenceDigitalPayment(customer_data,orderId);
      return result.paymentSuccessful?res.status(200).json(result):res.status(400).json(result);
    }
    else{
      return res.status(200).json(cashResponse);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


const postOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
    const {items,customer_data,prescription_image}=req.body;
    
    let order = await Order.findOne({
      userId: userId
    });
    const pharmacy = await Pharmacy.findOne({
      _id: req.body.customer_data.pharmacyManagerID
    });
    
    if (order) {
      order=await updateExistingCustomerOrder(order,pharmacy,items,customer_data,prescription_image);
      console.log("order updated");
    } else {
      
      order=await newCustomerOrder(userId,pharmacy,items,customer_data,prescription_image);
      console.log("new order created");
    }
    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
    return res.status(400).json({error: err.message});
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
    orderId,
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

const approveOrder = async (req, res) => {
  const { userId, orderId } = req.params;

  try {

    const pharmacy = await Pharmacy.findById(userId);

    if (!pharmacy) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }

    // Find the order in the pharmacy's Orders array
    const pharmacyOrder = pharmacy.Orders.find((order) => order._id.toString() === orderId);

    if (!pharmacyOrder) {
      return res.status(404).json({ message: "Order not found in the pharmacy" });
    }

    // Update the status of the order in the pharmacy model
    pharmacyOrder.status = "Approved";
    const id = pharmacyOrder.medicines[0].id;

    // Save the updated pharmacy
    await pharmacy.save();

    // Find the order in the orders model
    const order = await Order.findOne({ userId: id, "order_data._id": orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the status of the order in the orders model
    order.order_data.forEach((orderData) => {
      if (orderData._id.toString() === orderId) {
        orderData.status = "Approved";
      }
    });

    // Save the updated order in the orders model
    await order.save();

    // Find the pharmacy based on the pharmacyManagerID
   
    res.status(200).json({ message: "Order approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



module.exports = {
  postOrder,
  getOrder,
  getOrderDetails,
  billingOrder,
  approveOrder
};