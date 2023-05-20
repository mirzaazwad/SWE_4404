const Seller = require('../model/seller');

exports.getAllPharmacies = async (req, res) => {
  try {
    const pharmacies = await Seller.find().lean();
    res.status(200).json({pharmacies});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
