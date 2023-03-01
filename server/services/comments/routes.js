const express = require('express')
const route = express.Router()
const {User, Comment} = require('../../mysql/models')
const {isAuthorized} = require("../auth/utils");
const {io} = require("../../createServer/createServer");


io.on('connection', (socket) => {
    console.log('Socket connected!', socket.id)
    socket.on('setRoom', async (roomId) => socket.join(roomId))
    socket.on('disconnect', () => {
        console.log('Socket disconnected!', socket.id)
    })
});

route.post('/create/:id', isAuthorized, async(req, res) => {
    const comment = await Comment.create({
        comment: req.body.comment,
        userId: req.user.id,
        itemId: req.body.itemId,
    })
    const commentIncludeUser = await Comment.findByPk(comment.id, {
        include: {model: User, as: 'author', attributes: ['id', 'name', 'email']},
    })
    io.to(req.body.itemId).emit('newComment', commentIncludeUser)
    console.log('Comment sent!')
    res.json(comment)
})


route.post('/:id', async(req, res) => {
    const comments = await Comment.findAll({where: {itemId: req.params.id}, include: {model: User, as: 'author'}})
    res.json(comments)
})
module.exports = route