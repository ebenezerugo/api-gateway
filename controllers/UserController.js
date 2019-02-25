const JWT = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config/app');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const passportSignIn = passport.authenticate('local', { session: false });

signToken = user => {
    return JWT.sign({
      iss: 'CodeWorkr',
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, JWT_SECRET);
  }

router.post('/sign-up', async(req, res) => {
    // await User.sync({force:true});
    const { email, password } = req.body;
    
    // Check if there is a user with the same email
    const foundUser = await User.findOne({ where:{email}});
    if (foundUser) { 
      return res.status(403).json({ error: 'Email is already in use'});
    }

    const newUser = await User.create({email,password});

    // Generate the token
    const token = signToken(newUser);
    // Respond with token
    res.status(200).json({ token });
  });

  router.post('/sign-in', passportSignIn, (req, res) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  });

  module.exports = router
