const mongoose = require("mongoose");
const userLocation = require("../../model/LoginSignUp/userLocation");
const userModel = require("../../model/LoginSignUp/userModel");

const updateUserLocation = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such User" });
  }
  try {
    const users = await userLocation.findOneAndUpdate(
      { user_id: id },
      {
        ...req.body,
      }
    );
    if (!users) {
      return res.status(404).json({ error: "No such User" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const createUserLocation = async (req, res) => {
  const {user_id,latitude,longitude}=req.body;
  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(404).json({ error: "No Such User" });
  }
  const searchUser = await userModel.findById(user_id);
  if (!searchUser) {
    return res.status(404).json({ error: "user does not exist" });
  }
  const searchRecord=await userLocation.find({user_id:user_id});
  if(searchRecord.length!==0){
    return res.status(404).json({ error: "user location already set" });
  }
  try {
    const user = await userLocation.create({ user_id:user_id,latitude:latitude,longitude:longitude});
    console.log('user location');
    console.log(user);
    try {
      await user.save();
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: err.message });
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  updateUserLocation,
  createUserLocation
};
