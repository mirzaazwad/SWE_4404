const express=require('express');
const { getAllCategories, getAllTypes,addMedicine,addCateogry,addType } = require('../controller/add-medicine-controller');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
router.patch('/addNewMedicine/:id',addMedicine);
router.get('/findCateogry',getAllCategories);
router.get('/findType',getAllTypes);
router.post('/addCategory',addCateogry);
router.post('/addType',addType);

module.exports = router;