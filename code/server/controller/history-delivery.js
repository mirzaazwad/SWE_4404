const delivery = require("../model/delivery");

const deliveryHistory = async (req, res) => {
  const _id = req.params.id;
  try {
    const result = await delivery.find({
      _id: _id,
      "Delivery.status": "Delivered",
    });
    let deliveryArray = [];

    result.forEach((deliveryMan) => {
      deliveryMan.Delivery.forEach((deliveryInformation)=>{
        if(deliveryInformation.status==='Delivered'){
          deliveryArray.push(deliveryInformation);
        }
      })
      console.log(deliveryMan.Delivery);
    });
    return res.status(200).json(deliveryArray);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { deliveryHistory };
