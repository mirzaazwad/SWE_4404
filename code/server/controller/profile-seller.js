const sellerModel = require("../model/seller");

const getSellerByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await sellerModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getSellerById = async(req,res)=>{
  const {_id}=req.params;
  try{
    const user=await sellerModel.findById(_id);
    if(!user){
      throw Error('user not found');
    }
    return res.status(200).json(user);
  }
  catch(error){
    res.status(404).json({ error: error.message });
  }
}

const patchSellerByEmail = async (req, res) => {
  const {email} = req.params;
  try {
    const seller=await sellerModel
      .findOneAndUpdate(
        { email: email },
        {
          ...req.body,
        }
      )
      return res.status(200).json(seller);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const patchSellerById = async (req, res) => {
  const {_id} = req.params;
  try {
    const seller=await sellerModel
      .findByIdAndUpdate(
        _id,
        {
          ...req.body,
        }
      )
      return res.status(200).json(seller);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSellerID = async(req,res)=>{
  const _id=req.params.id;
  try{
    const email=(await userModel.findById(_id)).email;
    const seller=(await sellerModel.findOne({email:email}))._id;
    res.status(200).json({_id:seller});
  }
  catch(err){
    res.status(400).json({ success: false,error: err.message });
  }
}


module.exports={
  getSellerByEmail,
  getSellerID,
  patchSellerByEmail,
  getSellerById,
  patchSellerById
}
