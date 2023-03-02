const jwt = require('jsonwebtoken');
const { SECRETKEY } = require('./constants');
const Models = require('../../mysql/models');
const User = Models.User;

async function isAuthorized(req, res, next) {
  const jwtToken = req.headers.authorization;
  const decoded = jwtToken && jwt.verify(jwtToken, SECRETKEY);
  const user = await User.findByPk(decoded.id);
  if (decoded && user?.status === 'active') {
    req.user = decoded;
    next();
  } else res.status(401).send('Unauthorized');
}

module.exports = { isAuthorized };
