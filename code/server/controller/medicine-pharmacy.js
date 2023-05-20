const Pharmacy = require('../model/seller');

exports.getAllMedicines = async (req, res) => {
  try {
    const _id = req.params.id;
    const pharmacy = await Pharmacy.findById(_id);
    if (!pharmacy) {
      return res.status(404).json({ error: 'Pharmacy not found' });
    }
    const inventory = pharmacy.Inventory;
    return res.status(200).json(inventory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
