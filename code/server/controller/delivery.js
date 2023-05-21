const delivery = require('../model/delivery');
const pharmacy=require('../model/seller');


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
  const {customer_info,pharmacy,orderID}=req.body;
  try{
    const order=await pharmacy.findOne({'Orders.status': 'Approved','Orders._id':orderID});
    if(!order || order.status!=='Approved'){
      throw Error('order cannot be delivered');
    }
    const result=await delivery.addOrder(_id,customer_info,pharmacy,orderID);
    return res.status(200).json(result);
  }
  catch(err){
    res.status(400).json({message:err.message});
  }
}

module.exports = {getOrdersToDeliver,addOrder};