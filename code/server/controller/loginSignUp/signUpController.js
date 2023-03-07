const userModel = require("../../model/LoginSignUp/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

const createUser = async (req, res) => {
  const { userType,username, email, password, dob } = req.body;
  const hashedPasswordStore = await hashPassword(password);
  const searchUser = await userModel.find({ email: email });
  if (searchUser.length != 0) {
    return res.status(404).json({ error: "user already exists" });
  }
  try {
    const user = await userModel.create({ userType:userType,username:username, email:email, password:hashedPasswordStore, dob:dob });
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

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const users = await userModel.find({ email: email });
    if (users.length == 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such User" });
  }
  try {
    const users = await userModel.findById(id);
    if (!users) {
      return res.status(404).json({ error: "No such User" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such User" });
  }
  try {
    const users = await userModel.findOneAndDelete({ _id: id });
    if (!users) {
      return res.status(404).json({ error: "No such User" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
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
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  deleteUser,
  updateUser,
};
