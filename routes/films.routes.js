// films/:id/details

const router = require("express").Router();

const Comment = require('../models/Comment.model');
const Film = require('../models/Film.model');


router.get("/films/:id", (req, res) => {
    const { id } = req.params;
    console.log(id)
    Film.findById(id)
        .then(film => {
            res.render('film-views/film-details', { film })
        }).catch(e => console.error(e))
})

//check case for keys
router.post('/films/:id', (req, res, next) => {
    const { userName, commentContent } = req.body;

    Comment.create({ userName, commentContent})
    .then(allComments => {
        res.render('film-views/film-details', {comments: allComments})
    })
    .catch(err => console.err(err));
});

module.exports = router;


// do a get request that for the filters that adds them to the URL, so it'll be localhost30000/berlin/english



