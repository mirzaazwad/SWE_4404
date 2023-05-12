const User = require('../model/user');
const Seller = require('../model/seller');

exports.getAllPharmacies = async (req, res) => {
  try {
    const sellers = await Seller.find({}, 'email pharmacy').lean();
    const pharmacies = [];
    for (let seller of sellers) {
<<<<<<< HEAD:code/server/controller/viewPharmacyController.js
      const user = await User.findOne({ email: seller.email}).lean();
=======
      const user = await User.findOne({ email: seller.email, address: { $exists: true } }, 'address imageURL').lean();
>>>>>>> 3812edda2f5133a8f933f8609aec5d0e36ab4c28:code/server/controller/view-pharmacy.js
      if (user) {
        pharmacies.push({
          id: seller._id,
          pharmacyManagerID:user._id,
          name: seller.pharmacy,
<<<<<<< HEAD:code/server/controller/viewPharmacyController.js
          location: "default location",
          imageUrl: user.imageURL,
=======
          location: user.address,
          imageURL:user.imageURL
>>>>>>> 3812edda2f5133a8f933f8609aec5d0e36ab4c28:code/server/controller/view-pharmacy.js
        });
      }
    }
    res.status(200).json({pharmacies});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
