const buyerModel = require("../../../model/buyer/buyerModel");
const sellerModel = require("../../../model/seller/sellerModel");
const bcrypt = require("bcryptjs");
const findUser = async (req, res) => {
  console.log("frgdthth");
  const { id, password } = req.body;
  console.log(id);
  console.log(password);
  const searchUserBuyer = await buyerModel.findById( id );
  const searchUserSeller = await sellerModel.findById( id );
  if(searchUserBuyer!=null)
  {
    bcrypt.compare(password,searchUserBuyer.password,(err,ans)=>{
      if(err){
        console.log("buyer nai");
        return res.status(400).json({error:'unexpected error occurs'});
      }
      if(ans){
        console.log("milse");
        res.status(200).json({message:'password match',success:true,id:searchUserBuyer._id});
      }
      else{
        console.log("buyer ase pass mile nai");
         res.status(404).json({success: false, message: 'passwords do not match'});
      }
    });
  }
  else if (searchUserSeller != null)
  {
    bcrypt.compare(password,searchUserSeller.password,(err,ans)=>{
      if(err){
        console.log("seller nai");
        return res.status(400).json({error:'unexpected error occurs'});
      }
      if(ans){
        console.log("milse");
        res.status(200).json({message:'password match',success:true,id:searchUserSeller._id});
      }
      else{
        console.log("seller ase pass mile nai");
         res.status(404).json({success: false, message: 'passwords do not match'});
      }
    });
  }
  else {
    console.log(id);
    res.status(404).json({success: false, message: 'user not found'});
  }

};

const patchPasswordByID = async (req,res) =>{
    const {id} = req.params;
    try {
      const usersBuyer = await buyerModel.findById(id);
      const userSeller = await sellerModel.findById(id);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      if (!usersBuyer && !userSeller) {
        return res.status(404).json({ error: "User not found" });
      }
      if(usersBuyer)
      {

        await buyerModel.findOneAndUpdate({_id:id},{

            password: hashedPassword
          })
          .then(async (result)=>{
            const getResult=await buyerModel.findById(id);
            res.status(200).json(getResult);
          })
          .catch((err)=>{
            res.status(404).json({ error: err});
          })
      }
      else
      {
        await sellerModel.findOneAndUpdate({_id:id},{
          password: hashedPassword
          })
          .then(async (result)=>{
            const getResult=await sellerModel.findById(id);
            res.status(200).json(getResult);
          })
          .catch((err)=>{
            res.status(404).json({ error: err});
          })
      }
      
      
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
  
module.exports = {patchPasswordByID, findUser};
