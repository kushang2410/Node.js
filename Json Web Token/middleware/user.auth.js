const DataAuth = require('../models/user.schema');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const localAuth = (passport) => {
    passport.use(new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
        const user = await DataAuth.findOne({ email });
        console.log(email);
          try {
            if (!user) {
              console.log('User not found:', email);
              return done(null, false, { message: 'User not found' });
            }
        
            const isMatch = await bcrypt.compare(password, user.password);
            console.log(isMatch);
            if (isMatch) {
              console.log('Incorrect password for user:', email);
              return done(null, false, { message: 'Incorrect password' });
            }
        
            console.log('User authenticated successfully:', email);
            return done(null, user);
          } catch (error) {
            console.error('Error in LocalStrategy:', error);
            return done(error);
          }
}));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await DataAuth.findById(id);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, 'yourSecretKey');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = { localAuth, verifyToken };
