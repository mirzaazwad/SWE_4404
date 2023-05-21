const delivery = require("../model/delivery");

const onGoingDeliveries=async(req,res)=>{
  const _id=req.params.id;
  try{
    const deliveryMan=await delivery.findById(_id);
    const orders=deliveryMan.Delivery.filter(del=>del.status==='Delivering');
    console.log(orders);
    return res.status(200).json({Delivery:orders});
  }
  catch(error){
    return res.status(400).json({error:error.message});
  }
}

module.exports={onGoingDeliveries};