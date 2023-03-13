const express=require('express');
const {getUserByID,changePassword,patchUserByID,verifyPassword} = require('../../controller/profile-controller');
const requireAuth = require('../../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
router.patch('/updateUser/:id',patchUserByID);
router.get('/getUser/:id',getUserByID);
router.post('/verify',verifyPassword);
router.patch('/changePassword/:id',changePassword); 

module.exports = router;