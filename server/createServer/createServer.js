const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server);

module.exports.app = app;
module.exports.server = server;
module.exports.io = io;
module.exports.express = express;
