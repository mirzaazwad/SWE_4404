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
    console.log(orderID);
    await pharmacy.findOneAndUpdate(
      { 'Orders._id': orderID },
      { $set: { 'Orders.$.status': "Delivering" }}
    ).then((result)=>{
      console.log(result.nModified);
    })
    await orderModel.findOneAndUpdate(
      { 'order_data._id': orderID },
      { $set: { 'order_data.$.status': "Delivering" }}
    ).then((result)=>{
      console.log(result.nModified);
    })
    const result=await delivery.addOrder(_id,customer_info,pharmacyName,orderID);
    return res.status(200).json({_id:result._doc._id,success:true});
  }
  catch(err){
    res.status(400).json({message:err.message});
  }
}

const updateOrder=async(req,res)=>{
  const id=req.params.id;
  const orderID=req.body.orderID;
  try{
    await pharmacy.findOneAndUpdate(
      { 'Orders._id': orderID },
      { $set: { 'Orders.$.status': "Delivered" }}
    );
    await orderModel.findOneAndUpdate(
      { 'order_data._id': orderID },
      { $set: { 'order_data.$.status': "Delivered" }}
    );
    const result=await delivery.findOneAndUpdate(
      {_id:id,'Delivery.orderID':orderID},
        { $set: { 'Delivery.$.status': "Delivered" }
      }
    )
    return res.status(200).json(result);
  }
  catch(error){
    return res.status(400).error(error.message);
  }
}

module.exports = {getOrdersToDeliver,addOrder,updateOrder};