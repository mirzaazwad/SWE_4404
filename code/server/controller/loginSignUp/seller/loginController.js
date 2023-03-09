const sellerModel = require("../../../model/seller/sellerModel");
const bcrypt = require("bcryptjs");

const findUser = async (req, res) => {
  const { email, password } = req.body;
  const searchUser = await sellerModel.find({ email: email });
  if (searchUser.length == 0) {
    return res.status(404).json({ error: "user account does not exist" });
  }
  bcrypt.compare(password,searchUser[0].password,(err,ans)=>{
    if(err){
      return res.status(404).json({error:'unexpected error occurs'});
    }
    if(ans){
      res.status(200).json({message:'password match',success:true,id:searchUser[0]._id});
    }
    else{
       res.status(404).json({success: false, message: 'passwords do not match'});
    }
  });
};

module.exports = {
  findUser
};
