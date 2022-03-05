const express = require('express');
require('dotenv').config();
require('./db/index');
const configure = require('./config');
const app = express();

configure(app);

const PORT = process.env.PORT;

const session = require('express-session');
const MongoStore = require('connect-mongo');

const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/User.model.js');

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false, // <== false if you don't want to save empty session object to the store
    cookie: {
      sameSite: 'none',
      httpOnly: true,
      maxAge: 60000 // 60 * 1000 ms === 1 min
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/db-name'
    })
  })
)

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

// routes starting here: 
const index = require("./routes/index.routes");
app.use("/", index);

const router = require('./routes/user.routes.js');
app.use('/', router);

// require("./error-handling")(app);

module.exports = app;