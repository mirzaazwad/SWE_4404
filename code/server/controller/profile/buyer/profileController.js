const buyerModel = require("../../../model/buyer/buyerModel");

const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await buyerModel.findById(id);
    if (users.length == 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};







module.exports = {
  getUserByID
};
