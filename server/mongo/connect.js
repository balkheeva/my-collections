const mongoose = require('mongoose')
const RECONNECT_INTERVAL = 5000;

mongoose.connection.on('error', function() {
  console.error(`---- MongoDB: Connection error! Retrying in ${RECONNECT_INTERVAL / 1000} sec.`);
  mongoose.disconnect();
});

mongoose.connection.on('disconnected', function() {
  console.log('---- MongoDB: Disconnected!');
  setTimeout(connectDb, RECONNECT_INTERVAL);
});

async function connectDb() {
  const uri = "mongodb://root:example@localhost:27017";
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  try {
    await mongoose.connect(uri, options);
    console.log('CONNECTED!')
  } catch (error) {
    console.error('NOT CONNECTED! ', error);
  }
}

module.exports.connectDb = connectDb
