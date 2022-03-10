const router = require('express').Router();
const User = require("../models/User.model");
const Film = require("../models/Film.model");

router.get("/", (req, res, next) => {
    Film.find().then(allFilms => {
        res.render('index', {films: allFilms});
    }).catch(err => console.err(err))
});


router.get("/profile", (req, res, next) => {
    // console.log(req.session)
    // User.findById(req.session.passport.user).then(u => console.log(u)).catch(e => console.log(e))
    res.render("index");
});

module.exports = router;
