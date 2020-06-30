const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');
const { use } = require('passport');

module.exports = function (passport) {

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    }, 
    async (accessToken, refreshToken, profile, done) => {
        // console.log(profile);
        const new_user = {
            googleId: profile.id,
            displayName: profile.displayName,
            image: profile.photos[0].value
        };

        try {
            let user = await  User.findOne({googleId : profile.id});

            if(user){
                done(null, user);
            }else{
                user = await User.create(new_user);
                done(null, user);
            }
        } catch (error) {
            console.log(error);
        }
    }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
};