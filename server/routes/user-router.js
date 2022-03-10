const express = require("express");
const knex = require("knex");
const bcrypt = require("bcrypt-nodejs");
const register = require("../controllers/register-controller");
const signin = require("../controllers/signin-controller");
// const profile = require("../controllers/profile-controller");
// const image = require("../controllers/image-controller");
const db = require('../db');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const router = express.Router();


router.get("/", (req, res) => {
  res.send("it is working");
});
router.post("/signin", signin.handleSignin( bcrypt));
router.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
  console.log(req.body)
});
router.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
router.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
// app.post("/imageurl", (req, res) => {
//   image.handleApiCall(req, res);
// });

// app.listen(process.env.PORT || 3000, () => {
//   console.log(`app is running on port ${process.env.PORT}`);
// });


module.exports = router;
