const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const buyerModel = require("../model/LoginSignUp/buyer/buyerModel");
const buyerController = require('../controller/loginSignUp/google/googleSignUp');


passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/api/signup/google/redirect',
        scope: ['profile', 'email'],
        state: null
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile.state);
        const user=buyerController.createUser(profile);
        if(user){
            console.log(user);
        }
        else{
            console.log('Cant be created');
        }
    })
);

