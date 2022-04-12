items = 'mongodb://127.0.0.1:27017/items'
const mongoose = require('mongoose');

// mongoose
//   .connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB has been connected"))
//   .catch(e => {
//     console.error('Connection error :(', e.message);
//   });

// const db = mongoose.connection;

// module.exports = db;



mongoose.connect(items, { useNewUrlParser: true, useFindAndModify: false }).catch(e => {
  console.error('Connection error :(', e.message);
});

const db = mongoose.connection;

module.exports = db;


