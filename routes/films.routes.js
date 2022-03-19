const router = require('express').Router();
const ApiIS = require("../services/is-api.service");

const Film = require('../models/Film.model');

const apiIS = new ApiIS();

function checkImage(films){
    if (!(films instanceof Array)){
        if(films.poster_image === null) {
            films.poster_image = "/images/the-image-is-null.png";
        }
    } else {
        films.forEach((film) => {
            if(film.poster_image_thumbnail === null) {
                film.poster_image_thumbnail = "/images/the-image-is-null.png";
            }
        });
    } 
}

router.get("/films", async (req, res, next) => {
    try {
        const resFromApi = await apiIS.getFilms();
        const films = resFromApi.data.movies;
        checkImage(films);
        res.render("film-views/films", { films } );
    } catch (error) {
        console.log(error);
    }
});

router.post("/films", async (req, res, next) => {
    const { title, language, userLat, userLng } = req.body;
    try {
        const resFromApi = await apiIS.getFilmByTitle(title, language);
        const films = resFromApi.data.movies;
        if(films.length === 1){
            res.redirect(`/films/${films[0].id}`);
        } else {
            checkImage(films);
            res.render("film-views/films", { films } );
        }
    } catch (error) {
        console.log(error.response);
    }
});

// films/:id/details
router.get("/films/:id", async (req, res, next) => {
    const filmId = req.params.id;
    try {
        //Obtaining the info (film details) from the API
        const resFromApi = await apiIS.getFilmById(filmId);
        const filmFromAPI = resFromApi.data.movie;
        
        checkImage(filmFromAPI);

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
});

//check case for keys
// router.post('/films/:id', (req, res, next) => {
//     const { username, content } = req.body;
// // instead of this create comments as a model and then link the comments with the films via populate
//     Comment.create({ username, content })
//     .then(allComments => {
//         res.render('film-views/film-details', {comments: allComments})
//     })
//     .catch(err => console.err(err));
// });

module.exports = router;


// do a get request that for the filters that adds them to the URL, so it'll be localhost30000/berlin/english



