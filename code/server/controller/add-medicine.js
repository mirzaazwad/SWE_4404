const medicineCategory = require("../model/medicine-category");
const medicineModel = require("../model/medicine");
const medicineType = require("../model/medicine-type");
const pharmacyModel = require("../model/pharmacy");

const getAllCategories = async(req,res)=>{
  try{
    const result=await medicineCategory.getAll();
    res.status(200).json(result);
  }
  catch(err){
    res.status(400).json(err);
  }
}

const getAllTypes = async(req,res)=>{
  try{
    const result=await medicineType.getAll();
    res.status(200).json(result);
  }
  catch(err){
    res.status(400).json(err);
  }
}

const addMedicine = async(req,res)=>{
  const _id=req.params.id;
  try{
    const result=await pharmacyModel.addMedicine(_id,req.body);
    res.status(200).json(result);
  }
  catch(err){
    console.log(err);
    res.status(400).json({error:err.message});
  }
}

const addCateogry = async(req,res)=>{
  try{
    const result=await medicineCategory.addCategory(req.body.name,req.body.description);
    res.status(200).json(result);
  }
  catch(err){
    res.status(400).json({error:err.message});
  }
}

const addType=async(req,res)=>{
  try{
    const result=await medicineType.addType(req.body.name,req.body.description,req.body.strips);
    res.status(200).json(result);
  }
  catch(err){
    res.status(400).json({error:err.message});
  }
}

const addGlobalMedicine=async(req,res)=>{
  try{
    const result=await medicineModel.addNewMedicine(req.body);
    console.log(result);
    res.status(200).json(result);
  }
  catch(err){
    console.log(err);
    res.status(400).json({error:err.message});
  }
}

const getAllMedicines=async(req,res)=>{
  try{
    const result=await medicineModel.find();
    res.status(200).json({result});
  }
  catch(err){
    res.status(400).json({success:false,error:err.message});
  }
}

module.exports ={
  getAllCategories,
  getAllTypes,
  addMedicine,
  addCateogry,
  addType,
  addGlobalMedicine,
  getAllMedicines
}