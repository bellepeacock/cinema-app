// films/:id/details

const router = require("express").Router();

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




//check case for keys
// router.post('/films/:id', (req, res, next) => {
//     const { userName, commentContent } = req.body;
// // instead of this create comments as a model and then link the comments with the films via populate
//     Comment.create({ username, content })
//     .then(allComments => {
//         res.render('film-views/film-details', {comments: allComments})
//     })
//     .catch(err => console.err(err));
// });

module.exports = router;


// do a get request that for the filters that adds them to the URL, so it'll be localhost30000/berlin/english



