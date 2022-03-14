const items = 'mongodb+srv://Frontier:l8KhcHSYBhnWUw9w@cluster0/items?retryWrites=true&w=majority';
// 'mongodb://127.0.0.1:27017/items'
const mongoose = require('mongoose');

mongoose
  .connect(items, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => console.log("MongoDB has been connected"))
  .catch(e => {
    console.error('Connection error :(', e.message);
  });

const db = mongoose.connection;

module.exports = db;
