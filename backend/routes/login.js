// My APIs for registering and authenticating a user
const express = require('express')  //Added express 
const router = express.Router()
//var User = require('/path/to/user/model'); <- You have to actually put the path to the model file 
const org = process.env.ORG  //Added this line
const { login } = require('../models/models')

// We don't have a sign up page set up in the frontend, registration/sign up is not a requirement. You can do the API but only if you're planning on setting up a sign up page. 
// app.post('/register', function(req, res) {
//  var new_user = new User({
//    username: req.body.username
//  });

//  new_user.password = new_user.generateHash(req.body.password);
//  new_user.save();
// });

router.post('/login', function(req, res) {
  login.findOne({username: req.body.username}, function(error, user) {

    if (!user.validPassword(req.body.password)) {
      //Added a catch error
      return next(error)
      //password did not match
    } else {
      //You have to put code here, like what will happen next.
      //You will have to redirect the user to the dashboard (since they are logged in now)
      //You might also need to return some kind of token or something so that login status remains. Or maybe something to identify the org of the person login in.
      // password matched. proceed forward
    }
  });
});