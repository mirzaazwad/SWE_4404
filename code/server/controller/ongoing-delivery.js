const delivery = require("../model/delivery");

const onGoingDeliveries=async(req,res)=>{
  const _id=req.params.id;
  try{
    const deliveryMan=await delivery.findById(_id);
    return res.status(200).json(deliveryMan);
  }
  catch(error){
    return res.status(400).json({error:error.message});
  }
}

module.exports={onGoingDeliveries};