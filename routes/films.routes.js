const router = require('express').Router();
const ApiIS = require("../services/is-api.service");

const Film = require('../models/Film.model');

const apiIS = new ApiIS();

// films/:id/details
router.get("/films/:id", async (req, res, next) => {
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



