const router = require('express').Router();
const ApiIS = require("../services/is-api.service");

const Film = require('../models/Film.model');

const apiIS = new ApiIS();

<<<<<<< HEAD
// router.get("/films/:id", async (req, res, next) => {
//     const filmId = req.params.id;
//     try {
//         const resFromApi = await apiIS.getFilm(filmId);
//         const film = resFromApi.data.movie;
//         const cast = [...film.cast].slice(0,10);
//         film.cast = cast;
//         res.render("film-views/film-details", { film } );
//     } catch (error) {
//         console.log(error);
//     }
// });

// module.exports = router;
// films/:id/details


const Film = require('../models/Film.model');
const Comment = require('../models/Comment.model');


router.get("/films/:id", (req, res) => {
    const { id } = req.params;
    console.log(id)
    Film.findById(id)
        .then(film => {
            console.log(film)
            res.render('film-views/film-details', { film })
        }).catch(e => console.error(e))
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    Film.findById(id)
        .populate('comments')
        .then((filmById) => {
            Comment.find()
            .then((comment) => {res.render('/films/:id', {filmById, film})
            });
        }).catch(error => console.error(error))
});


=======
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

>>>>>>> c2a8efc (We modified the atributes of the models, merge the content of the films.routes)
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



