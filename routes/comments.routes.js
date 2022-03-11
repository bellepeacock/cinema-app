// films/:id/details

const router = require("express").Router();

const Film = require('../models/Film.model');
const Comment = require('../models/Comment.model');


router.get("/films/:id", (req, res) => {
    const { id } = req.params;
    console.log(id)
    Comment.findById(id)
        .then(comment => {
            console.log(comment)
            res.render('film-views/film-details', { film, comment })
        }).catch(e => console.error(e))
})

//check case for keys
router.post('/films/:id', (req, res, next) => {
    const { userName, commentContent } = req.body;
// instead of this create comments as a model and then link the comments with the films via populate
    Comment.create({ username, content })
    .then(allComments => {
        res.render('film-views/film-details', {comments: allComments})
    })
    .catch(err => console.err(err));
});

module.exports = router;