const { Client } = require('@elastic/elasticsearch');
const elasticClient = new Client({
  node: 'http://localhost:9200',

  auth: {
    username: 'elastic',
    password: 'changeme',
  },
});

module.exports = elasticClient;
