const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const db = require('./db');
const itemRouter = require('./routes/item-router');
const patientRouter = require('./routes/patient-router');
const userRouter = require('./routes/user-router')

const app = express();
const apiPort = 3000;

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

require("dotenv").config()
require("./routes/quoteRoute.js")(app);


mongoose
 .connect(
     process.env.MONGODB_CONNECTION_STRING,
         {
           useNewUrlParser: true,
           useUnifiedTopology: true,
         }
 )
 .then(() => console.log("MongoDB has been connected"))
 .catch((err) => console.log(err));


db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/api', itemRouter);
app.use('/api', patientRouter);
app.use('/api', userRouter);

// app.listen(apiPort, () => {
//     console.log(`[Hack.Diversity React Template] - Server running on port ${apiPort}`);
// });

// app.listen(process.env.PORT || 5000, () => {
//     console.log(`app is running on port ${process.env.PORT}`);
//   });

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
  