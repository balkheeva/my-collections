const express = require('express')
const route = express.Router()
const { User } = require('../../models/user/schema')

route.post('/', async (req, res) => {
    const users = await User.find().sort({created: -1}).exec()
    res.json(users)
})
route.post('/delete', async (req, res) => {
    const users = await User.find().sort({created: -1}).exec()
    res.json(users)
})

module.exports = route