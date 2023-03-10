const sellerModel = require("../../../model/seller/sellerModel");

const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await sellerModel.findById(id);
    if (users.length == 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const patchUserByID = async (req,res) =>{
    const {id} = req.params;
    try {
      const users = await buyerModel.findById(id);
      if (!users) {
        return res.status(404).json({ error: "User not found" });
      }
      await buyerModel.findOneAndUpdate({_id:id},{
        ...req.body
      })
      .then(async (result)=>{
        const getResult=await buyerModel.findById(id);
        res.status(200).json(getResult);
      })
      .catch((err)=>{
        res.status(404).json({ error: err});
      })
      
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }







module.exports = {
  getUserByID,
  patchUserByID
};
