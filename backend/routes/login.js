const express = require('express')
const router = express.Router()
//const org = process.env.ORG
const { login } = require('../models/models')

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

module.exports = router