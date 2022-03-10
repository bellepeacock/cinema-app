const { Router } = require('express');
const router = new Router();
 

const User = require('../models/User.model.js');
const passport = require('passport');
 

const bcrypt = require('bcryptjs');
const bcryptSalt = 10;
 
router.get('/signup', (req, res, next) => res.render('auth-views/signup'));
 
router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
 

  if (!username || !password) {
    res.render('auth-views/signup', { errorMessage: 'Indicate username and password' });
    return;
  }

  User.find().then(u => console.log(u)).catch(e => console.log(e))
  console.log('User')
 
  User.findOne({ username })
    .then(user => {
      console.log(user)
      if (user !== null) {
        res.render('auth-views/signup', { message: 'The username already exists' });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
 
      const newUser = new User({
        username,
        password: hashPass
      });
 
      newUser
        .save()
        .then(() => res.redirect('/'))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

router.get('/login', (req, res, next) => {
  res.render('auth-views/login', { errorMessage: req.flash('error') });
});

router.post('/login', (req, res, next) => {
  console.log('starting here')
    passport.authenticate('local', (err, theUser, failureDetails) => {
      console.log(theUser)
        if (err) {
          console.log('error')
            // sthing wrong with authenticating user
            return next(err);
        }

        if (!theUser) {
            res.render('auth-views/login', { errorMessage:"Wrong password or username"});
            return;
        }
        //save the user in session
        req.login(theUser, err => {
            if (err) {
                return next(err);
            }

        //all sorted, now logged in
        res.redirect('/');
        });
    })(req, res, next);
});
 
router.get('/user/{{_id}}/home', (req, res) => {
  const {id} = req.params;

  if (!req.user) {
    res.redirect('/login'); // can't access the page, so go and log in
    return;
  }
 
  // req.user is defined
  res.render('./user-views/user-home', { user: req.user });
});

// router.post(
//   '/login',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
//   })
// );

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/" 
  })
);

module.exports = router;