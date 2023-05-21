const delivery = require('../model/delivery');
const pharmacy=require('../model/seller');
const orderModel=require('../model/order');


const getOrdersToDeliver=async(req,res)=>{
  try{
    const orders=await pharmacy.find({'Orders.status': 'Approved'});
    return res.status(200).json({result:orders});
  }
  catch(err){
    res.status(400).json({message:err.message});
  }
}



const addOrder=async(req,res)=>{
  const _id=req.params.id;
  const {customer_info,pharmacyName,orderID}=req.body;
  try{
    console.log('customer information',customer_info);
    const order=await pharmacy.findOne({'Orders._id':orderID});
    // if(!order || order.status!=='Approved'){
    //   throw Error('order cannot be delivered');
    // }
    await pharmacy.findOneAndUpdate(
      { 'Orders._id': orderID },
      { $set: { 'Orders.$.status': "Delivering" }}
    );
    await orderModel.findOneAndUpdate(
      { 'order_data._id': orderID },
      { $set: { 'order_data.$.status': "Delivering" }}
    );
    const result=await delivery.addOrder(_id,customer_info,pharmacyName,orderID);
    return res.status(200).json(result);
  }
  catch(err){
    res.status(400).json({message:err.message});
  }
}

module.exports = {getOrdersToDeliver,addOrder};