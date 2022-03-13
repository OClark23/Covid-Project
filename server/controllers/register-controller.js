// const handleRegister = (req, res, db, bcrypt) => {
//     const { email, password} = req.body;
//     if (!email || !password) {
//        return res.status(400).json('incorrect form submission');
//     }
//     const hash = bcrypt.hashSync(password);
//     db.transaction(trx => {
//         trx.insert({
//             hash: hash,
//             email: email
//         })
//         .into('login')
//         .returning('email')
//         .then(loginEmail => {
//           return trx('users')
//           .returning('*')
//           .insert({
//           email: loginEmail[0],
//           joined: new Date()
//     })
//       .then(user => {
//           res.json(user[0]);
//     })
//   })
//   .then(trx.commit)
//   .catch(trx.rollback)
//   })
//     .catch(err => res.status(400).json(err))
//   }

//   module.exports = {
//       handleRegister: handleRegister
//   }
const User = require('../models/user-model');


  const handleRegister = (req, res, bcrypt) => {
    const body = req.body;
    // const hash = bcrypt.hashSync(password)
    // console.log('----------------------- createItem: req -----------------------')
    // console.log(req);
    // console.log('----------------------- createItem: body -----------------------')
    // console.log(body);
  
    if (!body) {
      return res.status(400).json({
        success: false,
        error: 'You must provide an user.',
      });
    }
  
    const user = new User(body);
    console.log(user)
  
    if (!user) {
      console.error(`[Hack.Diversity React Template] - 400 in 'createItem': 'user' is malformed.`);
      return res.status(400).json({
        success: false,
        message: "'user' is malformed",
      });
    }
  
    // console.log('----------------------- createItem: item -----------------------')
    // console.log(item);
  
    return user
      .save()
      .then(() => {
        console.error(`[Hack.Diversity React Template] - 201 in 'createItem': User created!`);
        return res.status(201).json({
          success: true,
          id: user._id,
          name: user.name,
          email: user.email,
          message: 'User created!',
        });
      })
      .catch(err => {
        console.log(err)
        console.error(`[Hack.Diversity React Template] - caught error in 'createUser'`);
        if (err.name === 'MongoError' && err.code === 11000) {
          // Duplicate username
          return res.status(422).send({ succes: false, message: 'User already exist!' });
        }
        Object.keys(err.errors).forEach(errorKey => {
          console.error(`[Hack.Diversity React Template] ERROR for: ${errorKey}`);
          console.error(
            `[Hack.Diversity React Template] => ${
              ((err.errors[errorKey] || {}).properties || {}).message
            }`,
          );
        });
        return res.status(400).json({
          success: false,
          error: err.errors,
          message: err.errors.name,
        });
      });
  };
  
  module.exports = {
    handleRegister
}