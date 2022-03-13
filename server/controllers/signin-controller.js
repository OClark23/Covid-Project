const User = require('../models/user-model');


const handleSignin = async (req, res) => {
    const {email, password} = req.body;
    console.log(req.body)
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
     }
     await User.find({email: {$eq: email } }, (err, user) => {
         console.log(user)
        if (err) {
          console.error(`[Hack.Diversity React Template] - 400 in 'getItems': ${err}`);
          return res.status(400).json({
            success: false,
            error: err,
          });
        }
        if (!user.length) {
          console.error(`[Hack.Diversity React Template] - 404 in 'getUser': Items not found`);
          return res.status(200).json({
            success: true,
            user: [],
          });
        }
        console.log(`[Hack.Diversity React Template] - 200 in 'getUser': Items fetched!`);
        return res.status(200).json({
          success: true,
          user: user,
        });
      }).catch(err => {
        console.error(`[Hack.Diversity React Template] - caught error in 'getItems': ${err}`);
        console.error(err);
        return res.status(404).json({
          success: false,
          error: err,
        });
      });
}

module.exports = {
    handleSignin: handleSignin
}

