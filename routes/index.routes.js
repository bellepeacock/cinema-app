const router = require('express').Router();

router.get("/", async (req, res, next) => {
    try {
        const resFromApi = await apiIS.getFilms();
        const films = resFromApi.data.movies;
        // console.log(films);
        res.render("index", { films } );
    } catch (error) {
        console.log(error);
    }
    res.render("index");
});

module.exports = router;
