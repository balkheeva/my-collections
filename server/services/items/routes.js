const express = require('express');
const route = express.Router();
const {
  Item,
  Tag,
  User,
  Collection,
  ItemTags,
  Comment,
} = require('../../mysql/models');
const { isAuthorized } = require('../auth/utils');

route.post('/', async (req, res) => {
  const items = await Item.findAll({
    include: [
      { model: Tag, as: 'tags' },
      {
        model: Collection,
        as: 'Collection',
        include: { model: User, as: 'author' },
      },
    ],
    order: [['createdAt', 'DESC']],
  });
  res.json(items);
});

route.post('/delete', isAuthorized, async (req, res) => {
  const item = await Item.findByPk(req.body.id);
  await item.destroy();
  await ItemTags.destroy({ where: { itemId: req.body.id }, hooks: true });

  res.json(item);
});

route.post('/edit', isAuthorized, async (req, res) => {
  await Item.update(
    { name: req.body.name, optionalFields: req.body.optionalFields },
    { where: { id: req.body.id, CollectionId: req.body.CollectionId } },
  );
  const tagIds = req.body.tags.map((tag) => tag.id);
  let data = tagIds.map((tagId) => {
    return {
      itemId: req.body.id,
      tagId: tagId,
    };
  });
  const ids = await ItemTags.findAll({
    where: { itemId: req.body.id },
    attributes: ['id'],
  });
  const flatIds = [];
  ids.map((id) => flatIds.push(id.toJSON().id));
  await ItemTags.destroy({ where: { id: flatIds } });
  await ItemTags.bulkCreate(data);
  res.json({ ok: true });
});

route.post('/like', isAuthorized, async (req, res) => {
  const userId = req.user.id;
  const item = await Item.findByPk(req.body.id);
  let likes = item.likes || [];

  if (likes.length > 0) {
    const found = likes.find((like) => like === userId);
    if (found) {
      likes = likes.filter((like) => like !== found);
    } else likes.push(userId);
  } else likes.push(userId);

  const updatedItem = await item.update({ likes: likes });
  res.json(updatedItem);
});

route.post('/create/:id', isAuthorized, async (req, res) => {
  const item = await Item.create({
    name: req.body.name,
    CollectionId: req.params.id,
    optionalFields: req.body.optionalFields,
  });

  const tagIds = req.body.tags.map((tag) => tag.id);
  let data = tagIds.map((tagId) => {
    return {
      itemId: item.id,
      tagId: tagId,
    };
  });
  await ItemTags.bulkCreate(data);
  res.json({ ok: true });
});

route.post('/:id', async (req, res) => {
  const item = await Item.findByPk(req.params.id, {
    include: [
      { model: Tag, as: 'tags' },
      {
        model: Collection,
        as: 'Collection',
        include: {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email'],
        },
      },
      {
        model: Comment,
        as: 'comments',
        include: { model: User, as: 'author' },
        separate: true,
        order: [['createdAt', 'ASC']],
      },
    ],
  });
  res.json(item);
});

module.exports = route;
