const { DataAuth } = require("../models/UserData");
const localStrategy = require('passport-local').Strategy;

const UserAuth = (req, res, next) => {
    const { Name, Description } = req.body;
    if (Name && Description) {
        next();
    } else {
        res.send("invalid data");
    }
};

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {  
        return next();
    }
    console.log('Not authenticated');
    return res.redirect('/login');
};

const localAuth = (passport) => {
    passport.use(new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
        let User = await DataAuth.findOne({ email });
        try {
            if (!User) {
                console.log("User not found");
                return done(null, false);
            }
            if (User.password !== password) {
                console.log("Incorrect password");
                return done(null, false);
            }
            return done(null, User);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((User, done) => {
        done(null, User.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const User = await DataAuth.findById(id);
            done(null, User);
        } catch (error) {
            done(error, false);
        }
    });
};

module.exports = { UserAuth, isAuth, localAuth };
