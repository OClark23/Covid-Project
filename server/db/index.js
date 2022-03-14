// const mongoose = require('mongoose');

// mongoose.connect(items, { useNewUrlParser: true, useFindAndModify: false }).catch(e => {
//   console.error('Connection error :(', e.message);
// });

// mongoose
//  .connect(
//      process.env.MONGODB_CONNECTION_STRING,
//          {
//            useNewUrlParser: true,
//            useUnifiedTopology: true,
//          }
//  )
//  .then(() => console.log("MongoDB has been connected"))
//  .catch((err) => console.log(err));


// const db = mongoose.connection;

// module.exports = db;


const items = 'mongodb://127.0.0.1:27017/items'
const data = 'mongodb://127.0.0.1:27017/data'
const mongoose = require('mongoose');

mongoose
  .connect(items, { useNewUrlParser: true, useFindAndModify: false })
  .catch(e => {
    console.error('Connection error :(', e.message);
  });

const db = mongoose.connection;

module.exports = db;

