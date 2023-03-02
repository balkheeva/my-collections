const proxy = require('express-http-proxy');
const path = require('path');
const usersRoute = require('./services/users/routes');
const authRoute = require('./services/auth/routes');
const collectionsRoute = require('./services/collections/routes');
const itemsRoute = require('./services/items/routes');
const themesRoute = require('./services/themes/routes');
const tagsRoute = require('./services/tags/routes');
const searchRoute = require('./services/search/routes');
const commentRoute = require('./services/comments/routes');
const { isAuthorized } = require('./services/auth/utils');
const { connectMySQL } = require('./mysql/connect');
const { app, server, express } = require('./createServer/createServer');
const { createIndices } = require('./elasticsearch/createIndices');
const PORT = process.env.PORT || 8080;

connectMySQL();
createIndices();

app.use('/users', isAuthorized, usersRoute);
app.use('/auth', authRoute);
app.use('/collections', collectionsRoute);
app.use('/items', itemsRoute);
app.use('/themes', themesRoute);
app.use('/tags', tagsRoute);
app.use('/search', searchRoute);
app.use('/comments', commentRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(path.resolve(__dirname, '../build/index.html')));
  });
} else {
  app.use(proxy('http://127.0.0.1:3000', { ws: true }));
}

server.listen(PORT, () => console.log('Listening to PORT ', PORT));
