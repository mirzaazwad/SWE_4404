const buyerModel=require('../model/buyer');

const getBuyerByEmail = async (req, res) => {
  const {email} = req.params;
  try {
    const user = await buyerModel.findOne({ email: email.email });
    if (!user) {
      return res.status(400).json({ error: "Buyer not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getBuyerById = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await buyerModel.findById(id);
    if (!user) {
      return res.status(400).json({ error: "Buyer not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const patchBuyerById = async (req, res) => {
  const {id} = req.params;
  try {
    const buyer=await buyerModel
      .findByIdAndUpdate(
        id,
        {
          ...req.body,
        }
      );
    res.status(200).json(buyer);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const patchBuyerByEmail = async (req, res) => {
  const {email} = req.params;
  try {
    const buyer=await buyerModel
      .findOneAndUpdate(
        { email: email.email },
        {
          ...req.body,
        }
      );
    res.status(200).json(buyer);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports={getBuyerByEmail,patchBuyerByEmail,getBuyerById,patchBuyerById}

