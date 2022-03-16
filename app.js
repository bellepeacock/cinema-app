const express = require('express');
require('dotenv').config();
require('./db/index');
const configure = require('./config');
const app = express();
const flash = require('connect-flash');

configure(app);

const PORT = process.env.PORT;

const session = require('express-session');
const MongoStore = require('connect-mongo');

const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/User.model.js');

const GoogleStrategy = require("passport-google-oauth20").Strategy;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false, // <== false if you don't want to save empty session object to the store
    cookie: {
      // sameSite: 'none',
      httpOnly: true,
      maxAge: 6000000 // 60 * 1000 ms === 1 min
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    })
  })
)

app.use(flash());

passport.serializeUser((user, cb) => cb(null, user._id));
 
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => cb(null, user))
    .catch(err => cb(err));
});
 
passport.use(
  new LocalStrategy(
    (username, password, done) => {
      User.findOne({ username })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'Incorrect username' });
          }

          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect password' });
          }

          done(null, user);
        })
        .catch(err => done(err));
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: "630266211498-qng7h2vk90iu8d8qs7u5vuses676fqo4.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // to see the structure of the data in received response:
      // console.log("Google account details:", profile);
 
      User.findOne({ googleID: profile.id })
        .then(user => {
          if (user) {
            done(null, user);
            return;
          }
 
          User.create({ googleID: profile.id })
            .then(newUser => {
              done(null, newUser);
            })
            .catch(err => done(err)); // closes User.create()
        })
        .catch(err => done(err)); // closes User.findOne()
    }
  )
);



// routes starting here: 
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const userRoutes = require('./routes/user.routes.js');
app.use('/', userRoutes);

const filmsRoutes = require('./routes/films.routes.js');
app.use('/', filmsRoutes);

const cinemasRouter = require('./routes/cinemas.routes.js');
app.use('/', cinemasRouter);

const commentRouter = require('./routes/comments.routes.js');
app.use('/', commentRouter);

// require("./error-handling")(app);

module.exports = app;