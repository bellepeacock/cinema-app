const router = require('express').Router();
const User = require("../models/User.model");
const ApiIS = require("../services/is-api.service");

const apiIS = new ApiIS();

router.get("/", async (req, res, next) => {
    try {
        const resFromApi = await apiIS.getFilms();
        const films = resFromApi.data.movies;
        console.log(films);
        res.render("index", { films } );
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
