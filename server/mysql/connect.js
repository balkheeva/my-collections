const Sequelize = require('sequelize');

const sequelize = new Sequelize('mycollections', 'root', 'example', {
  host: '127.0.0.1',
  port: 3307,
  dialect: 'mysql',
  dialectOptions: {},
});

async function connectMySQL() {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((error) => {
      console.error('Unable to connect to the database: ', error);
    });
  await sequelize.sync({ force: true });
  console.log('All models were synchronized successfully.');
}

module.exports.connectMySQL = connectMySQL;
module.exports.sequelize = sequelize;
