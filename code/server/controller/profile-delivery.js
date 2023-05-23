const deliveryModel=require('../model/delivery');

const getDeliveryByEmail = async (req, res) => {
  const {email} = req.params;
  try {
    const user = await deliveryModel.findOne({ email: email.email });
    if (!user) {
      return res.status(400).json({ error: "Delivery not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getDeliveryByOrderID=async(req,res)=>{
  const id=req.params.id;
  try{
    const result=await deliveryModel.findOne({ 'Delivery.orderID': id });
    console.log(result);
    return res.status(200).json(result);
  }
  catch(error){
    res.status(400).json({ error: error.message });
  }
}

const getDeliveryAndManByOrderID=async(req,res)=>{
  const id=req.params.id;
  try{
    const result=await deliveryModel.findOne({ 'Delivery.orderID': id });
    const deliveryMan={username:result.username,email:result.email,phone:result.phone,imageURL:result.imageURL};
    const arr=result.Delivery.find((deliver)=>deliver.orderID===id);
    return res.status(200).json({...deliveryMan,arr});
  }
  catch(error){
    res.status(400).json({ error: error.message });
  }
}

const getDeliveryById = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await deliveryModel.findById(id);
    if (!user) {
      return res.status(400).json({ error: "Delivery not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const patchDeliveryById = async (req, res) => {
  const {id} = req.params;
  try {
    const delivery=await deliveryModel
      .findByIdAndUpdate(
        id,
        {
          ...req.body,
        }
      );
    res.status(200).json(delivery);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const patchDeliveryByEmail = async (req, res) => {
  const {email} = req.params;
  try {
    const delivery=await deliveryModel
      .findOneAndUpdate(
        { email: email.email },
        {
          ...req.body,
        }
      );
    res.status(200).json(delivery);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports={getDeliveryByEmail,patchDeliveryByEmail,getDeliveryById,patchDeliveryById,getDeliveryByOrderID,getDeliveryAndManByOrderID}

