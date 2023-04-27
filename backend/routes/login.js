const express = require('express')
const router = express.Router()
const org = process.env.ORG
const { login } = require('../models/models')

// Login validation
router.post('/', (req, res, next) => {
    login.findOne({username: req.body.username}, (error, user) => {

        if (!user.validPassword(req.body.password)) {
          //password did not match
          return next(error)
        } else if (user.role === 'viewer') {
          // password matched, role viewer
          user.isAllowed = true
          user.isEditor = false
          return res.json(user)
        } else {
            user.isAllowed = true
            user.isEditor = true
            return res.json(user) 
        }
      })
})

module.exports = router