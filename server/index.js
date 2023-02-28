import {NextFunction} from "express";

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { connectDb } = require("./connect");
const { User } = require('./user/schema')
const { Token } = require('./token/schema')
const { v4: uuidv4 } = require('uuid')
const path = require("path");

const PORT = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

connectDb()

// app.get('/', (req, res) => {
//     res.send('ok')
// })

async function isAuthorized(req: Request, res: Response, next: NextFunction) {
    const userExists = await Token.findOne({token: req.headers.authorization})
    if (userExists) next()
    else res.status(401).send('Unauthorized')
}

app.post('/users', isAuthorized, async (req: Request, res: Response) => {
    const users = await User.find().sort({created: -1}).exec()
    res.json(users)
})

app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (user) {
        if (user.status !== 'active') {
            res.status(400).send('User with this email has been blocked')
            return
        }
        let token
        const prevToken = await Token.findOne({email: req.body.email})
        if (!prevToken) {
            token = uuidv4();
            await Token.create({token, email: req.body.email, userId: user._id})
        } else token = prevToken.token
        res.json({ token })
        next()
    } else res.status(400).send("Incorrect email or password");

});

app.post('/register', async (req: Request, res: Response) => {
    if (await User.findOne({email: req.body.email})) {
        res.status(400).send('User with this email already exists')
        return;
    }
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        created: new Date(),
        updated: null,
        status: "active"
    });
    const token = uuidv4();
    await Token.create({token, email: req.body.email, userId: user._id})
    res.json({ token })
});


app.use(express.static(path.resolve(__dirname, '../build')))

app.get('*', function(req: Request, res: Response) {
    res.sendFile(path.join(path.resolve(__dirname, '../build/index.html')));
});


app.listen(PORT, () => console.log("Listening to PORT ", PORT))