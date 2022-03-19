
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User.model.js');

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, cb) => cb(null, user._id));
 
passport.deserializeUser((id, cb) => {
  console.log('deserializeUser', id)
  User.findById(id)
    .then(user => {
      console.log('user is', user)
      cb(null, user)
    })
    .catch(err => {
      console.log('deserialization failed', err)
      cb(err)
    });
});
 
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    (username, password, done) => {
      console.log('local / login', username, password)
      User.findOne({ username })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'Incorrect username' });
          }

          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect password' });
          }
          console.log("OK")
          done(null, user);
        })
        .catch(err => done(err));
    }
  )
);

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: "630266211498-qng7h2vk90iu8d8qs7u5vuses676fqo4.apps.googleusercontent.com",
//       clientSecret: "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",
//       callbackURL: "/auth/google/callback"
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // to see the structure of the data in received response:
//       // console.log("Google account details:", profile);
 
//       User.findOne({ googleID: profile.id })
//         .then(user => {
//           if (user) {
//             done(null, user);
//             return;
//           }
 
//           User.create({ googleID: profile.id })
//             .then(newUser => {
//               done(null, newUser);
//             })
//             .catch(err => done(err)); // closes User.create()
//         })
//         .catch(err => done(err)); // closes User.findOne()
//     }
//   )
// );

module.exports = passport
