const express = require('express');
const route = express.Router();
const { Token, User } = require('../../mysql/models');
const jwt = require('jsonwebtoken');
const { SECRETKEY } = require('../auth/constants');

route.post('/', adminOnly, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

function adminOnly(req, res, next) {
  if (req.user.adminrole) {
    next();
  } else {
    res.status(403).send('Access denied');
  }
}

route.post('/block', adminOnly, async (req, res) => {
  const user = await User.update(
    {
      status: 'blocked',
    },
    { where: { id: req.body.id } },
  );
  await Token.destroy({ where: { userId: req.body.id } });
  res.json(user);
});

route.post('/unblock', adminOnly, async (req, res) => {
  const users = await User.update(
    {
      status: 'active',
    },
    { where: { id: req.body.id } },
  );
  res.json(users);
});

route.post('/change-role', adminOnly, async (req, res) => {
  await User.update(
    { adminrole: !req.body.adminrole },
    { where: { id: req.body.id } },
  );
  res.json({ ok: true });
});

route.post('/delete', adminOnly, async (req, res) => {
  try {
    const user = await User.findByPk(req.body.id);
    await user.destroy();
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});

route.post('/impersonate', adminOnly, async (req, res) => {
  const user = (await User.findOne({ where: { id: req.body.id } })).toJSON();
  const admin = await User.findOne({ where: { id: req.user.id } });
  if (user && admin.status === 'active' && user.id !== admin.id) {
    const spoofUser = { ...user, impersonatedBy: req.user.id };
    const token = jwt.sign(spoofUser, SECRETKEY);
    res.json({ token });
  } else res.status(400).send('Cannot impersonate');
});

module.exports = route;
