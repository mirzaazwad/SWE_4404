const express=require('express');
const {getUserByID,changePassword,patchUserByID,verifyPassword,getSellerID,updateProfilePicture} = require('../controller/profile-controller');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
router.patch('/updateUser/:id',patchUserByID);
router.get('/getUserSellerId/:id',getSellerID);
router.get('/getUser/:id',getUserByID);
router.post('/verify',verifyPassword);
router.patch('/changePassword/:id',changePassword); 
router.patch('/updateProfilePicture/:id',updateProfilePicture);


module.exports = router;