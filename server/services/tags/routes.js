const express = require('express')
const route = express.Router()
const Models = require('../../mysql/models')
const Item = Models.Item

route.post('/', async(req, res) => {
    const items = await Item.findAll()
    res.json(items)
})

route.post('/create/:id', async (req, res) => {
    console.log(req.params.id)
    const items = await Item.create({
        name: req.body.name,
        CollectionId: req.params.id
    })
    res.json(items)
})

module.exports = route