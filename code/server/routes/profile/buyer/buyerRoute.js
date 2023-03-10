const express=require('express');
const {getUserByID, patchUserByID} = require('../../../controller/profile/buyer/profileController');
const router=express.Router();

router.get('/:id',getUserByID);
router.patch('/:id',patchUserByID);
// router.get('/logout',(req,res)=>{
//   //handle with passport
//   req.logout();
//   res.redirect('/login');
// })

// const authCheck = (req,res,next)=>{
//   if(!req.user){
//     res.redirect('/auth/login');
//   }
//   else{
//     //if it is not logged in
//     next();
//   }
// }

// router.get('/',authCheck,(req,res)=>{
//   res.send('you are logged in this is your profile'+req.user.username);
// })

module.exports = router;