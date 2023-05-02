const express=require('express');
const { getAllCategories, getAllTypes,getAllMedicines,addMedicine,addCateogry,addType,addGlobalMedicine} = require('../controller/add-medicine');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
router.patch('/addNewMedicine/:id',addMedicine);
router.post('/addNewGlobalMedicine',addGlobalMedicine);
router.get('/findAllMedicines',getAllMedicines);
router.get('/findCateogry',getAllCategories);
router.get('/findType',getAllTypes);
router.post('/addCategory',addCateogry);
router.post('/addType',addType);

module.exports = router;