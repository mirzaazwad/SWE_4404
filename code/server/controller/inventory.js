const pharmacyModel = require("../model/pharmacy");
const medicineType = require("../model/medicine-type");
const getMedicine=async (req,res)=>{
  const id=req.params.id;
  try{
    const result=await pharmacyModel.findOne({pharmacyManagerID:id}).select('Inventory');
    res.status(200).json(result);
  }
  catch(err){
    res.status(200).json({error:err.message});
  }
}

const getType = async(req,res)=>{
  const id=req.params.id;
  try{
    const result=await medicineType.findById(id);
    res.status(200).json({result});
  }
  catch(err){
    res.status(400).json({error:err.message});
  }
}

const getTypes = async(req,res)=>{
  try{
    const result=await medicineType.find();
    console.log(result);
    res.status(200).json({result});
  }
  catch(err){
    res.status(400).json({error:err.message});
  }
}

const addToStock = async(req,res)=>{
  const id=req.params.id;
  try{
    console.log(id);
    const index=req.body.index.toString();
    const option=req.body.stock.toString();
    const field='Inventory.'+index+'.'+'Stock.'+option;
    if(req.body.amount<0){
      return res.status(400).json({error:"Cannot be negative"});
    }
    const result=await pharmacyModel.findOneAndUpdate({_id:id},
        { $set: { [field]: req.body.amount } });
    const inventory=await pharmacyModel.findById(id);
    return res.status(200).json(inventory);
  }
  catch(err){
    res.status(400).json({error:err.message});
  }
}

module.exports={
  getMedicine,
  getType,
  getTypes,
  addToStock
}