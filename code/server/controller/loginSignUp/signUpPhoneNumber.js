const userModel = require("../../model/LoginSignUp/userModel");
const mongoose = require("mongoose");

const updateUserPhoneNumber = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such User" });
  }
  try {
    const users = await userModel.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!users) {
      return res.status(404).json({ error: "No such User" });
    }
    res.status(200).json({id:users._id,userType:users.userType,email:users.email});
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  updateUserPhoneNumber,
};
