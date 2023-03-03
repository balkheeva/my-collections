const express = require('express');
const route = express.Router();
const client = require('../../elasticsearch/connect');

route.post('/', async (req, res) => {
  try {
    const result = await client.search({
      index: 'items',
      query: {
        multi_match: {
          query: req.body.query,
          fields: [
            'name',
            'collection.author.name',
            'optionalFields',
            'comments.comment',
            'comments.author.name',
            'tags.name',
            'collection.themes.name',
          ],
        },
      },
      highlight: {
        pre_tags: ['<b>'],
        post_tags: ['</b>'],
        fields: {
          name: {},
          optionalFields: {},
          'collection.author.name': {},
          'comments.comment': {},
          'comments.author.name': {},
          'tags.name': {},
          'collection.themes.name': {},
        },
      },
    });
    res.json(
      result.hits.hits.map((i) => ({
        highlight: i.highlight,
        data: i._source,
        id: i._source.id,
      })),
    );
    console.log(result.hits.hits);
  } catch (error) {
    console.error(error);
  }
});
route.post('/by-query', async (req, res) => {
  try {
    const r = await client.search({
      index: 'items',
      query: {
        query_string: {
          query: req.query.query,
        },
      },
    });
    const result = r.hits.hits;
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});
module.exports = route;
