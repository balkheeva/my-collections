const express = require('express');
const route = express.Router();
const Models = require('../../mysql/models');
const User = Models.User;
const Token = Models.Token;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRETKEY } = require('./constants');

route.post('/login', async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    if (user.status !== 'active') {
      res.status(400).send('User with this email has been blocked');
      return;
    }
    const password_valid = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (password_valid) {
      const token = jwt.sign(user.toJSON(), SECRETKEY);
      const foundToken = await Token.findOne({ where: { userId: user.id } });
      if (foundToken) await foundToken.update({ token });
      else await Token.create({ token, userId: user.id });
      res.json({ token });
    } else res.status(400).json({ error: 'Password Incorrect' });
  } else res.status(400).send('User does not exist');
});

route.post('/register', async (req, res) => {
  if (await User.findOne({ where: { email: req.body.email } })) {
    res.status(400).send('User with this email already exists');
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
    //adminrole: true
  });
  const parsedUser = user.toJSON();
  const token = jwt.sign(
    pick(parsedUser, ['id', 'email', 'name', 'adminrole']),
    SECRETKEY,
  );
  await Token.create({
    token: token,
    userId: user.id,
  });
  res.json({ token });
});

module.exports = route;

function pick(obj, props) {
  const picked = {};
  for (let prop of props) {
    picked[prop] = obj[prop];
  }
  return picked;
}
