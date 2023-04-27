const Pharmacy = require('../model/pharmacy-model');
const MedicineType = require('../model/medicine-type');
const MedicineCategory = require('../model/medicine-category');

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

    const medicineType = await MedicineType.findOne({ _id: medicine.TypeID });
    const medicineCategory = await MedicineCategory.findOne({ _id: medicine.CateogryID });
    // console.log(medicineCategory);
    res.status(200).json({ ...medicine.toObject(), medicineType: medicineType.Name, medicineCategory: medicineCategory.cateogry });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get medicine info',
      error: err,
    });
  }
};
