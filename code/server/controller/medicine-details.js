const Pharmacy = require('../model/seller');
const MedicineCategory = require('../model/medicine-category');

const getAllCategories = async (req, res) => {
  try {
    const medicineCategories =  MedicineCategory.find() ;
    console.log(medicineCategories);
    res.status(200).json(medicineCategories);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get medicine categories',
      error: error.message,
    });
  }
};

const getAllTypes = async (req, res) => {

  try {
    const medicineTypes = await MedicineType.find();
    res.status(200).json(medicineTypes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed to get medicine categories',
      error: error.message,
    });
  }
};


const getMedicine = async (req, res, next) => {
  const _id = req.params.id;
  const medicineId = req.params.medicineId;
  try {
    const pharmacy = await Pharmacy.findById(_id);

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

module.exports = {getAllCategories, getMedicine, getAllTypes}
