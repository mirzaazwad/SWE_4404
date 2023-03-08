const express=require('express');
const {createUser,getUserByEmail} = require('../../../controller/loginSignUp/seller/signUpController');
const { createUserLocation } = require('../../../controller/loginSignUp/seller/signUpLocation');
const {updateUserPhoneNumber} = require('../../../controller/loginSignUp/seller/signUpPhoneNumber');
const router=express.Router();
const passport = require('passport');
const cors=require('cors');

router.post('/',createUser);
router.get('/email/:email',getUserByEmail);
router.patch('/phone/:id',updateUserPhoneNumber);
router.post('/location',createUserLocation);
// auth with google+
router.get('/google', passport.authenticate('google', {
  scope: ['profile','email']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send('you reached the redirect URI');
});

module.exports = router;