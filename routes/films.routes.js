const router = require('express').Router();
const ApiIS = require("../services/is-api.service");

const apiIS = new ApiIS();

router.get("/films/:id", async (req, res, next) => {
    const filmId = req.params.id;
    try {
        const resFromApi = await apiIS.getFilm(filmId);
        const film = resFromApi.data.movie;
        const cast = [...film.cast].slice(0,10);
        film.cast = cast;
        res.render("film-views/film-details", { film } );
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;