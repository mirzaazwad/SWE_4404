const User = require('../model/user-model');
const Seller = require('../model/seller-model');

exports.getAllPharmacies = async (req, res) => {
  try {
    const sellers = await Seller.find({}, 'email pharmacy').lean();
    const pharmacies = [];
    for (let seller of sellers) {
      const user = await User.findOne({ email: seller.email, address: { $exists: true } }, 'address').lean();
      if (user) {
        pharmacies.push({
          id: seller._id,
          pharmacyManagerID:user._id,
          name: seller.pharmacy,
          location: user.address,
        });
      }
    }
    res.status(200).json({pharmacies});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
