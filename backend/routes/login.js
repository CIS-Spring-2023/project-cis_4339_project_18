const express = require('express')
const router = express.Router()
//const org = process.env.ORG
const bcrypt = require('bcrypt');
const { login } = require('../models/models')

// Login validation
router.post('/', (req, res, next) => {
    const username = req.body
    const password = req.body
    const role = req.body

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }
        
    try {
        const logged = login.findOne({ username });
        if (!logged || !(bcrypt.compare(password, logged.password))) {
        return res.status(400).json({ error: "Incorrect login" });
        }
        
        res.json(logged);
        } catch (error) {
        console.error(error);
        return next(error);
        }
      })

module.exports = router