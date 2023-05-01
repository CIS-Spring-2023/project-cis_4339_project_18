const express = require('express')
const router = express.Router()
const org = process.env.ORG
const { login } = require('../models/models')

//We didn't set up additional login routes because it wasn't a project requirement to have singup or change password pages. We used mongoose to add documents to our login collection using the following code in app.js:

// const { login } = require('./models/models')
//const user = new login({
//  username: 'jjake',
//  role: 'editor',
//  client: {
//      _id: "62cdb310-e212-11ed-bb53-935f7ff538cc",
//      orgs: "communitygarden"
//    }
//});
//user.password = user.generateHash('1234p');
//user.save();


// Login validation
router.post('/', (req, res, next) => {
    login.findOne({username: req.body.username}, (error, user) => {

        if (!user.validPassword(req.body.password)) {
          //password did not match
          return next(error)
        } else {
          return res.json(user) 
        }
      })
})

module.exports = router