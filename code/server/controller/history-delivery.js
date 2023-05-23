const delivery = require("../model/delivery");

const deliveryHistory = async (req, res) => {
  const _id = req.params.id;
  try {
    const result = await delivery.findOne({
      _id: _id,
      "Delivery.status": "Delivered",
    });
    const deliveryArray=result.Delivery.filter((dle)=>dle.status==="Delivered")
    return res.status(200).json(deliveryArray);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { deliveryHistory };
