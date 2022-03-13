const items = 'mongodb+srv://Frontier:l8KhcHSYBhnWUw9w@cluster0.ddl8n.mongodb.net/items'

const mongoose = require('mongoose');

mongoose
  .connect(items, { useNewUrlParser: true, useFindAndModify: false })
  .catch(e => {
    console.error('Connection error :(', e.message);
  });

const db = mongoose.connection;

module.exports = db;


