const delivery = require('../model/delivery');
const pharmacy=require('../model/seller');
const orderModel=require('../model/order');


const getOrdersToDeliver=async(req,res)=>{
  try{
    const orders=await pharmacy.find();
    let orderResult=[];
    orders.forEach((pharmacy)=>{
      let pharmacyResult=[];
      pharmacy.Orders.forEach((order)=>{
        if(order.status==='In progress'){
          pharmacyResult.push({_id:order._id,customer_data:order.customer_data,status:order.status});
        }
      })
      orderResult.push({Orders:pharmacyResult,pharmacy:pharmacy.pharmacy,coordinates:pharmacy.coordinates,address:pharmacy.address})
    })
    return res.status(200).json({result:orderResult});
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
    )
    await orderModel.findOneAndUpdate(
      { 'order_data._id': orderID },
      { $set: { 'order_data.$.status': "Delivering" }}
    )
    const result=await delivery.addOrder(_id,customer_info,pharmacyName,orderID);
    return res.status(200).json({_id:result._doc._id,success:true});
  }
  catch(err){
    console.log(err);
    res.status(400).json({message:err.message});
  }
}

const updateOrder=async(req,res)=>{
  const orderID=req.body.orderID;
  console.log(req.body);
  try{
    console.log(orderID);
    await pharmacy.findOneAndUpdate(
      { 'Orders._id': orderID },
      { $set: { 'Orders.$.status': "Delivered" }}
    );
    await orderModel.findOneAndUpdate(
      { 'order_data._id': orderID },
      { $set: { 'order_data.$.status': "Delivered" }}
    );
    return res.status(200).json({success:true});
  }
  catch(error){
    return res.status(400).json(error.message);
  }
}

const updateComplete=async(req,res)=>{
  const orderID=req.body.orderID;
  console.log(req.body);
  try{
    await pharmacy.findOneAndUpdate(
      { 'Orders._id': orderID },
      { $set: { 'Orders.$.status': "Completed" }}
    );
    await orderModel.findOneAndUpdate(
      { 'order_data._id': orderID },
      { $set: { 'order_data.$.status': "Completed" }}
    );
    const deliveryMan=await delivery.findOneAndUpdate(
      {'Delivery.orderID':orderID},
        { $set: { 'Delivery.$.status': "Completed" }
      }
    )
    return res.status(200).json({success:true});
  }
  catch(error){
    return res.status(400).json(error.message);
  }
}

const GetDeliveryStatus=async(req,res)=>{
  const _id=req.params.id;
  try{
    console.log(_id);
    const orderer=await orderModel.findOne(
      { 'order_data._id': _id }
    );
    const ordersFromModel=orderer.order_data.filter(del=>del.status==='Delivered');
    if(ordersFromModel.length>0){
      return res.status(400).json({success:false});
    }
    const deliveryMan=await delivery.findOne({'Delivery.orderID':_id});
    const orders=deliveryMan.Delivery.filter(del=>del.status==='Delivered');
    return res.status(200).json({Delivery:orders,success:true});
  }
  catch(error){
    return res.status(400).json({error:error.message});
  }
}

const GetCompletedStatus=async(req,res)=>{
  const _id=req.params.id;
  try{
    console.log(_id);
    const orderer=await orderModel.findOne(
      { 'order_data._id': _id }
    );
    const ordersFromModel=orderer.order_data.filter(del=>del.status==='Completed');
    if(ordersFromModel.length>0){
      return res.status(400).json({success:false});
    }
    const deliveryMan=await delivery.findOne({'Delivery.orderID':_id});
    const orders=deliveryMan.Delivery.filter(del=>del.status==='Completed');
    return res.status(200).json({Delivery:orders,success:true});
  }
  catch(error){
    return res.status(400).json({error:error.message});
  }
}

const ResetDeliveryStatus=async(req,res)=>{
  const _id=req.params.id;
  const orderID=req.body.orderID;
  try{
    const deliveryMan=await delivery.findOneAndUpdate({'Delivery.orderID':orderID},{
      $set:{'Delivery.$.status':'Delivering'}
    });
    const orders=deliveryMan.Delivery.filter(del=>del.status==='Delivering');
    return res.status(200).json({Delivery:orders,success:true});
  }
  catch(error){
    return res.status(400).json({error:error.message});
  }
}

const ResetCompleteStatus=async(req,res)=>{
  const _id=req.params.id;
  const orderID=req.body.orderID;
  try{
    const deliveryMan=await delivery.findOneAndUpdate({'Delivery.orderID':orderID},{
      $set:{'Delivery.$.status':'Complete'}
    });
    const orders=deliveryMan.Delivery.filter(del=>del.status==='Complete');
    return res.status(200).json({Delivery:orders,success:true});
  }
  catch(error){
    return res.status(400).json({error:error.message});
  }
}

const UpdateOrderStatus=async(req,res)=>{
  const _id=req.params.id;
  const orderID=req.body.orderID;
  try{
    const deliveryMan=await delivery.findOneAndUpdate(
      {_id:_id,'Delivery.orderID':orderID},
        { $set: { 'Delivery.$.status': "Delivered" }
      }
    )
    const orders=deliveryMan.Delivery.filter(del=>del.status==='Delivered');
    return res.status(200).json({Delivery:orders,success:true});
  }
  catch(error){
    return res.status(400).json({error:error.message});
  }
}


const UpdateFail=async(req,res)=>{
  const _id=req.params.id;
  const orderID=req.body.orderID;
  try{
    await pharmacy.findOneAndUpdate(
      { 'Orders._id': orderID },
      { $set: { 'Orders.$.status': "In progress" }}
    );
    await orderModel.findOneAndUpdate(
      { 'order_data._id': orderID },
      { $set: { 'order_data.$.status': "In progress" }}
    );
    const deliveryMan=await delivery.updateOne(
      {_id:_id},
      { $pull: { Delivery: { orderID: orderID } } }
    )
    return res.status(200).json({Delivery:orders,success:true});
  }
  catch(error){
    return res.status(400).json({error:error.message});
  }
}


const UpdateCompletedStatus=async(req,res)=>{
  const _id=req.params.id;
  const orderID=req.body.orderID;
  try{
    const deliveryMan=await delivery.findOneAndUpdate(
      {_id:_id,'Delivery.orderID':orderID},
        { $set: { 'Delivery.$.status': "Completed" }
      }
    )
    const orders=deliveryMan.Delivery.filter(del=>del.status==='Completed');
    return res.status(200).json({Delivery:orders,success:true});
  }
  catch(error){
    return res.status(400).json({error:error.message});
  }
}

module.exports = {getOrdersToDeliver,addOrder,updateOrder,GetDeliveryStatus,ResetDeliveryStatus,UpdateOrderStatus,UpdateCompletedStatus,GetCompletedStatus,ResetCompleteStatus,updateComplete,UpdateFail};