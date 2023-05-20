const Pharmacy = require('../model/seller');

const getOrder = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    try {
      // Find the pharmacy based on the pharmacyManagerID matching the user ID
      const pharmacy = await Pharmacy.findById(userId);
  
      if (!pharmacy) {
        return res.status(404).json({ message: "Pharmacy not found" });
      }
  
      // Retrieve the orders from the pharmacy
      const orders = pharmacy.Orders;
  
      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  const getOrderDetails = async (req, res) => {
    const { userId, orderId } = req.params;
  
    try {
      // Find the pharmacy based on the pharmacyManagerID matching the user ID
      const pharmacy = await Pharmacy.findById(userId);

      if (!pharmacy) {
        return res.status(404).json({ message: "Pharmacy not found" });
      }
  
      // Find the specific order in the Orders array that matches the orderId
      const orderData = pharmacy.Orders.find((order) => order._id.toString() === orderId);
      if (!orderData) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({ order: orderData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  module.exports = {
    getOrder,
    getOrderDetails
  };
  