const Pharmacy = require('../model/pharmacy');
const MedicineType = require('../model/medicine-type');
const MedicineCategory = require('../model/medicine-category');

exports.getAllCategories = async (req, res) => {
  try {
    const medicineCategories =  MedicineCategory.find() ;
    console.log(medicineCategories);
    res.status(200).json(medicineCategories);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get medicine categories',
      error: err,
    });
  }
};


exports.getMedicine = async (req, res, next) => {
  const pharmacyId = req.params.id;
  const medicineId = req.params.medicineId;

  try {
    const pharmacy = await Pharmacy.findOne({ pharmacyManagerID: pharmacyId });

    // Find the medicine in the inventory array
    const medicine = pharmacy.Inventory.find(m => m._id.toString() === medicineId);
    if (!medicine) {
      return res.status(404).json({
        message: 'Medicine not found in pharmacy inventory',
      });
    }
    res.status(200).json({ ...medicine.toObject(), medicineType: medicine.Type.Name, medicineCategory: medicine.Category.category });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get medicine info',
      error: err,
    });
  }
};
