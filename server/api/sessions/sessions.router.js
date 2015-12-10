'use strict';

var router = require('express').Router(),
    _ = require('lodash');

var HttpError = require('../../utils/HttpError');
var User = require('../users/user.model');

router.get('/login', function(req,res,next){
        req.query.email = req.query.email.replace('%40', '@').replace('%2E', '.');
        //req.session.userId = req.query.email;
        // console.log("get 1 user by email: " + req.session.userId);
        User.findOne({email:req.query.email}).exec()
        .then(function(user){
            req.session.userId = user._id;
            res.json(user);
        })
        .then(null, next);
});

router.delete('/logout', function(req,res,next){
    req.session.userId = null;
    res.json({"message": "user logged out"});
});

module.exports = router;