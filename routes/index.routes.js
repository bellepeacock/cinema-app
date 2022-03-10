const router = require('express').Router();
const User = require("../models/User.model");
const ApiIS = require("../services/is-api.service");


router.get("/", async (req, res, next) => {
    console.log('index');
    const { movies: films } = await ApiIS.getFilms();
    res.render("index", films);
});


router.get("/profile", (req, res, next) => {
    console.log(req.session.passport.user);
    res.render("index");
    User.findById(req.session.passport.user).then(u => console.log(u)).catch(e => console.log(e))
});

module.exports = router;