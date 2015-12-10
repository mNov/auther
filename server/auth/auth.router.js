'use strict';

var router = require('express').Router(),
    _ = require('lodash');

var HttpError = require('../utils/HttpError');
var User = require('../api/users/user.model');
var passport = require('passport');


var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
    new GoogleStrategy({
        clientID: "603575696316-u4l312k1re8lvaedp1sq9uqir0mgllhj.apps.googleusercontent.com",
        clientSecret: "9q0wcM86he2uFMNd2wBTMwlK",
        callbackURL: "http://127.0.0.1:8080/auth/google/callback"
    },
    // google will send back the token and profile
    function (token, refreshToken, profile, done) {
        //the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
        /*
        --- fill this part in ---
        */
        console.log('---', 'in verification callback', profile, '---');
        done();
    })
);


//google authentication and login 
router.get('/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after google has authenticated the user
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect : '/home',
    failureRedirect : '/'
  }));

module.exports = router;