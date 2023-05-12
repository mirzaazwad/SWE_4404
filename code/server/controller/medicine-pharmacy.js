const Pharmacy = require('../model/pharmacy');

exports.getAllMedicines = async (req, res) => {
  try {
    const pharmacyId = req.params.id;
    const pharmacy = await Pharmacy.findOne({ pharmacyManagerID: pharmacyId });
    if (!pharmacy) {
      return res.status(404).json({ error: 'Pharmacy not found' });
    }
    console.log(pharmacyId);
    
    const inventory = pharmacy.Inventory;
    console.log(inventory);
    return res.status(200).json(inventory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
