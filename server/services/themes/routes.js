const express = require('express');
const route = express.Router();
const Models = require('../../mysql/models');
const { Op } = require('sequelize');
const Theme = Models.Theme;

route.post('/', async (req, res) => {
  const themes = await Theme.findAll();
  res.json(themes);
});
route.post('/find', async (req, res) => {
  const themes = await Theme.findAll({
    where: {
      name: {
        [Op.startsWith]: req.body.name,
      },
    },
  });
  res.json(themes);
});

module.exports = route;
