const express = require('express')
const route = express.Router()
const Models = require('../../mysql/models')
const Collection = Models.Collection
const Item = Models.Item
const Theme = Models.Theme
const User = Models.User
const Tag = Models.Tag
const CollectionThemes = Models.CollectionThemes
const shortid = require('shortid');
const {isAuthorized} = require("../auth/utils");

route.post('/', async (req, res) => {
    const collections = await Collection.findAll({
        include: [
            {model: Item, as: 'items'},
            {model: Theme, as: 'themes'},
            {model: User, as: 'author'}
        ]
    })

    res.json(collections)
})

route.post('/create-themes', async (req, res) => {
    await Theme.bulkCreate([
            {name: 'Art'},
            {name: 'Fashion'},
            {name: 'Sport'},
            {name: 'Books'},
            {name: 'Food'},
            {name: 'Health&Beauty'},
            {name: 'Clothes'},
            {name: 'Music'},
            {name: 'Cinema'},
            {name: 'Photography'}
        ])
    res.json({ok: true})
})

route.post('/get-by-user', async (req, res) => {
    const collections = await Collection.findAll({
        where: {authorId: req.body.userId},
        include: [{model: Item, as: 'items'}, {model: Theme, as: 'themes'}, {model: User, as: 'author'}]
    })
    res.json(collections)
})
route.post('/create', isAuthorized, async (req, res) => {
    const collection = await Collection.create({
        name: req.body.name,
        description: req.body.description,
        authorId: req.user.id,
        image: req.body.image
    })
    const themeIds = req.body.themes.map(theme => theme.id)
    let data = themeIds.map(themeId => {
        return {
            collectionId: collection.id, themeId: themeId
        }
    })
    await CollectionThemes.bulkCreate(data)
    res.json({ok: true})
})
route.post('/edit', isAuthorized, async (req, res) => {
    const collection = await Collection.update({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
    }, {where: {id: req.body.id}})

    await CollectionThemes.destroy({where: {collectionId: req.body.id}})

    const themeIds = req.body.themes.map(theme => theme.id)
    let data = themeIds.map(themeId => {
        return {
            collectionId: req.body.id, themeId: themeId
        }
    })
    await CollectionThemes.bulkCreate(data)
    res.json(collection)
})
route.post('/delete', isAuthorized, async (req, res) => {
    const collection = await Collection.findByPk(req.body.id)
    await collection.destroy()
    res.json(collection)
})

route.post('/add-field/:id', isAuthorized, async (req, res) => {
    const collection = await Collection.findByPk(req.params.id);
    const optionalFields = collection.optionalFields || []
    const found = optionalFields.find(f => f.name === req.body.name)
    if (found) {
        res.status(400).send('Field with this name already exists')
        return;
    }
    optionalFields.push({
        type: req.body.type,
        id: shortid.generate(),
        name: req.body.name,
    })
    const updatedCollection = await Collection.update({optionalFields: optionalFields}, {where: {id: req.params.id}})
    res.json(updatedCollection)
})

route.post('/:id', async (req, res) => {
    const collection = (await Collection.findByPk(req.params.id, {
        include: [{
            model: Item, as: 'items', include: {model: Tag, as: 'tags'}
        }, {model: User, as: 'author'}, {model: Theme, as: 'themes'}]
    }))
    res.json(collection)
})
module.exports = route