const buyerModel = require("../../../model/LoginSignUp/buyer/buyerModel");
const sellerModel = require("../../../model/LoginSignUp/seller/sellerModel");

const createUser = async (obj,userType) => {
  const id=obj._json.id;
  const username=obj._json.name;
  const email=obj._json.email;
  const dob=obj._json.birthday;
  const searchUser = await buyerModel.find({ email: email });
  if (searchUser.length != 0) {
    return null;
  }
  try {
    const user = await buyerModel.create({googleID:id,username:username, email:email});
    console.log(user);
    try {
      await user.save();
    } catch (err) {
      console.log(err);
      return null;
    }

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports={
  createUser
}