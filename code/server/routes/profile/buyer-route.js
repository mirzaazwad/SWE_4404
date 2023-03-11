const express=require('express');
const {getBuyerByEmail, patchBuyerByEmail} = require('../../controller/profile-controller');
const router=express.Router();

router.get('/:email',getBuyerByEmail);
router.patch('/:email',patchBuyerByEmail);

module.exports = router;

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