const buyerModel = require("../../../model/buyer/buyerModel");
const sellerModel = require("../../../model/seller/sellerModel");


const userExists = async (req, res) => {
  const email = req.body.email;
  const searchBuyer = await buyerModel.findOne({ email: email });
  const searcSeller = await sellerModel.findOne({ email: email });
  if (!searchBuyer && !searcSeller) {
    return res.status(404).json({ error: "user account does not exist" });
  }
  else{
    return res.status(200).json({ error: "user account exists" });
  }
};

module.exports = {
  userExists
};
