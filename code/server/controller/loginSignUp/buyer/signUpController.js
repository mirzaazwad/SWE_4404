const buyerModel = require("../../../model/buyer/buyerModel");
const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

const createUser = async (req, res) => {
  const {username, email, password, dob } = req.body;
  const hashedPasswordStore = await hashPassword(password);
  const searchUser = await buyerModel.find({ email: email });
  if (searchUser.length != 0) {
    return res.status(404).json({ error: "user already exists" });
  }
  try {
    const user = await buyerModel.create({username:username, email:email, password:hashedPasswordStore, dob:dob });
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

const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const users = await buyerModel.find({ email: email });
    if (users.length == 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};







module.exports = {
  createUser,
  getUserByEmail
};
