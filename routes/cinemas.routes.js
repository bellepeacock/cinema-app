const router = require('express').Router();
const ApiIS = require("../services/is-api.service");

const apiIS = new ApiIS();

router.get("/cinemas", async (req, res, next) => {
    try {
        const resFromApi = await apiIS.getCinemas();
        const cinemas = resFromApi.data.cinemas;
        res.render("cinema-views/cinemas", { cinemas , googleApiKey: process.env.API_GOOGLE_KEY } );
    } catch (error) {
        console.log(error);
    }
});

/* router.get("/cinemas/:id", async (req, res, next) => {
    const filmId = req.params.id;
    try {
        //Obtaining the info (film details) from the API
        const resFromApi = await apiIS.getFilm(filmId);
        const filmFromAPI = resFromApi.data.movie;
        
        //The API returns all of the cast, but I only want to show a few of them.
        //The slice is to get the first ten.
        const cast = [...filmFromAPI.cast].slice(0,10);
        filmFromAPI.cast = cast;

        //Obtaining the info of the comments
        Film.findOne({ id: filmId })
            .populate('comments')
            .populate('username')
            .then((filmFromDbWithComments) => {
                res.render("film-views/film-details", { filmFromAPI , filmFromDbWithComments } );
            })
            .catch(error => console.error(error));

    } catch (error) {
        console.log(error);
    }
}); */

module.exports = router;