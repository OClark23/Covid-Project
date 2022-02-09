const items = 'mongodb://127.0.0.1:27017/items'
const data = 'mongodb://127.0.0.1:27017/data'
const mongoose = require('mongoose');

mongoose
  .connect(items, { useNewUrlParser: true, useFindAndModify: false })
  .catch(e => {
    console.error('Connection error', e.message);
  });

mongoose
  .connect(data, { useNewUrlParser: true, useFindAndModify: false })
  .catch(e => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

module.exports = db;
