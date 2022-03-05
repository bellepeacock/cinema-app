const router = require('express').Router();
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
    console.log('index')
    res.render("index");
});


router.get("/profile", (req, res, next) => {
    console.log(req.session.passport.user)
    res.render("index");
    User.findById(req.session.passport.user).then(u => console.log(u)).catch(e => console.log(e))
});

module.exports = router;