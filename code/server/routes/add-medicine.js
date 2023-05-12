const express=require('express');
const { getAllCategories, getAllTypes,getAllMedicines,addMedicine,addCategory,addType,addGlobalMedicine} = require('../controller/add-medicine');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
router.patch('/addNewMedicine/:id',addMedicine);
router.post('/addNewGlobalMedicine',addGlobalMedicine);
router.get('/findAllMedicines',getAllMedicines);
router.get('/findCategory',getAllCategories);
router.get('/findType',getAllTypes);
router.post('/addCategory',addCategory);
router.post('/addType',addType);

module.exports = router;