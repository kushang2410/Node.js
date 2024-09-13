const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Auth0Strategy = require('passport-auth0');
const bcrypt = require('bcrypt');
const DataAuth = require('../models/user.schema');

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
};

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
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
  

passport.use(new Auth0Strategy({
    domain: 'dev-x73v2wpizcwygx3r.us.auth0.com',
    clientID: '5KaL4GSnowGYwfm4suX8anmQ9rbVwRdv',
    clientSecret: 'z0kTONv0bhwJci_aasEGdKJtRB_CzkiVVrukDyX_IMcHpdMig_Yb9RoLck1DxHG9',
    callbackURL: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid profile email'
  },
  async (accessToken, refreshToken, extraParams, profile, done) => {
    try {
      const email = profile.emails[0].value;
      let user = await DataAuth.findOne({ email });
  
      if (!user) {
        const profilePhoto = profile.picture || '';
        user = new DataAuth({
          email: email,
          name: profile.displayName,
          profilePhoto: profilePhoto,
          password: await bcrypt.hash('temporaryPassword', 10)  
        });
        await user.save();
        console.log("User saved to database:", user);
      } else {
        console.log("User found in database:", user);
      }
      return done(null, user);
    } catch (error) {
      console.error("Error in Auth0Strategy:", error);
      return done(error, false);
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

module.exports = { isAuth };
