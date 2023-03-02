const express = require('express');
const route = express.Router();
const Models = require('../../mysql/models');
const { Op } = require('sequelize');
const { isAuthorized } = require('../auth/utils');
const Tag = Models.Tag;

route.post('/', async (req, res) => {
  const tags = await Tag.findAll();
  res.json(tags);
});
route.post('/create', isAuthorized, async (req, res) => {
  const tag = await Tag.create({
    name: req.body.label,
  });
  res.json(tag);
});
route.post('/find', async (req, res) => {
  const tags = await Tag.findAll({
    where: {
      name: {
        [Op.startsWith]: req.body.name,
      },
    },
  });
  res.json(tags);
});

module.exports = route;
