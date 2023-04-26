// My APIs for registering and authenticating a user
const express = require('express')
const router = express.Router()
//const org = process.env.ORG
const { login } = require('../models/models')

// We don't have a sign up page set up in the frontend, registration/sign up is not a requirement. You can do the API but only if you're planning on setting up a sign up page. 
// app.post('/register', function(req, res) {
//  var new_user = new User({
//    username: req.body.username
//  });

//  new_user.password = new_user.generateHash(req.body.password);
//  new_user.save();
// });

//router.post('/login', function(req, res) {
//  login.findOne({username: req.body.username}, function(error, user) {

  //  if (!user.validPassword(req.body.password)) {
    //  //Added a catch error
      //return next(error)
      //password did not match
    //} else {
      // password matched. proceed forward
      // Set the app.locals.role and app.locals.org to the client's role and org
    //  req.app.locals.userId = req.body.role
    //  req.app.locals.org = req.body.client.orgs
      // Then redirect to the dashboard
    //  res.redirect('/')
  //  }
//  })
//})




// Anthony code:

// Login validation
router.get('/login', async (req, res, next) => {
    const username = req.body
    const password = req.body
    const role = req.body

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }
        
    try {
        const login = await loginDataSchema.findOne({ username });
        if (!login || !(await bcrypt.compare(password, login.password))) {
        return res.status(400).json({ error: "Incorrect login" });
        }
        
        res.json(login);
        } catch (error) {
        console.error(error);
        return next(error);
        }
      })
