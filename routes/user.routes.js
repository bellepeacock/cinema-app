const { Router } = require('express');
const router = new Router();
 

const User = require('../models/User.model.js');
const Email = require('../models/User.model.js');
const passport = require('passport');
 

const bcrypt = require('bcryptjs');
const bcryptSalt = 10;
 
router.get('/signup', (req, res, next) => res.render('auth-views/signup'));
 
router.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body;
 

  if (!username || !email || !password) {
    res.render('auth-views/signup', { errorMessage: 'Indicate username and password' });
    return;

  } 

 
  User.findOne({ username, email })
    .then(user => {
      console.log(user)
      if (user && email !== null) {
        res.render('auth-views/signup', { message: 'The email/username already exists' });
        return;
      }

      
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      
      const newUser = new User({
        username,
        email,
        password: hashPass
      });
      
      newUser
      .save()
      .then((createdUser) => {
          res.redirect('/login')
          req.session.currentUser = createdUser;
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

router.get('/login', (req, res, next) => {
  res.render('auth-views/login', { user: req.params });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
      console.log('theUser:', theUser, failureDetails);
        if (err) {
            // sthing wrong with authenticating user
            return next(err);
        }

        if (!theUser) {
            res.render('auth-views/login', { errorMessage:"Wrong login credentials"});
            return;
        }

        req.session.currentUser = theUser; // req.login does not save in session
        console.log('passport.session():', passport.session());
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

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

// router.post('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });

router.get('/logout', (req, res) => {
  req.session.destroy();
  //find passport version of the next line:
  // req.session.destroy;
  res.redirect('/');
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
    // successRedirect: "/profile",
    successRedirect: "/",
    failureRedirect: "/" 
  })
);

module.exports = router;