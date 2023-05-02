const prescription = require('../model/prescription');
const uploadPrescription = async (req, res) => {
    try {
        const id = req.params.id;
        const prescriptionName = req.body.prescriptionName;
        const prescriptionImage = req.body.prescriptionImage;
        const image_id = req.body.image_id;
        console.log(prescriptionImage);
        const newPrescription = new prescription({
             userId: id,
            name: prescriptionName,
             prescriptionImage: prescriptionImage,
             image_id: image_id
        });
        await newPrescription.save();
        return res.status(200);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}
const getPrescriptions = async (req, res) => {
    try {
        const id = req.params.id;
        const prescriptions = await prescription.find({ userId: id });
        if (!prescriptions || prescriptions.length === 0) {
            console.log("prescriptions not found");
            return res.status(404).json({ error: 'Prescriptions not found' });
        }
        return res.status(200).json(prescriptions);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports={uploadPrescription, getPrescriptions};