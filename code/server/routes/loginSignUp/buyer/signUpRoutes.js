const express=require('express');
const {createUser,getUserByEmail} = require('../../../controller/loginSignUp/buyer/signUpController');
const {updateUserPhoneNumber} = require('../../../controller/loginSignUp/buyer/signUpPhoneNumber');
const router=express.Router();
const passport = require('passport');
router.post('/',createUser);
router.get('/email/:email',getUserByEmail);
router.patch('/phone/:id',updateUserPhoneNumber);
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