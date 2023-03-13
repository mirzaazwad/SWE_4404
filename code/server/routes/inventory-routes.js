const express=require('express');
const { getMedicine,getType } = require('../controller/inventory-controller');
// const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

// router.use(requireAuth);
router.get('/getMedicines/:id',getMedicine);
router.get('/getType/:id',getType);

module.exports = router;