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
        // User.findOne({})


        console.log('---', 'in verification callback', profile, '---');
        console.log("refresh token: ", refreshToken)
        User.findOne({'google.id':profile.id}).exec()
        .then(function(user){
            if (!user) {
                User.create({
                email: profile.emails[0].value,
                name: profile.displayName,
                google: {
                    id: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    token: token
                }
            })
            .then(function(user){
                console.log(user);
                done();
            }).then(null, next)
            }
            else {
                console.log(user)
                done(user);
            }
        })
        
    })
);


//google authentication and login 
router.get('/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after google has authenticated the user
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect : '/stories',
    failureRedirect : '/users'
  }));

module.exports = router;