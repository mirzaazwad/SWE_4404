const express=require('express');
const router=express.Router();
const passport = require('passport');

// auth with google+
router.get('/google', passport.authenticate('google', {
  scope: ['profile','email'],
  state:null
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  const state=req.query.state;
  res.send(`State parameter: ${state}`);
});

module.exports = router;