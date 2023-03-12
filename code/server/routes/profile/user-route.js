const express=require('express');
const {getUserByID,changePassword} = require('../../controller/profile-controller');
const requireAuth = require('../../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
router.get('/getUser/:id',getUserByID);
router.patch('/changePassword/:id',changePassword); 

module.exports = router;