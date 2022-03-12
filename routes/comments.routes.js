// films/:id/details

const router = require("express").Router();

const Film = require('../models/Film.model');
const Comment = require('../models/Comment.model');
const User = require('../models/User.model');


// router.get("/films/:id", (req, res) => {
//     const { id } = req.params;
//     console.log(id)
//     Comment.findById(id)
//         .then(comment => {
//             console.log(comment)
//             res.render('film-views/film-details', { comment })
//         }).catch(e => console.error(e))
// })

//check case for keys
router.post('/films/:id', async (req, res, next) => {
    const id = req.params.id;
    const { username, content } = req.body;

    try{
        const { _id: userResFromDb } = await User.findOne({ username })
        const { _id: commentCreatedID } = await Comment.create({ username: userResFromDb, content })

        const resFromFilmDb = await Film.findOne({ id })
        console.log(resFromFilmDb)

        if(resFromFilmDb === null) {
            await Film.create({ id, comments: [commentCreatedID] });
        } else {
            const newCommentsArray = resFromFilmDb.comments
            newCommentsArray.push(commentCreatedID);
    
            Film.findOneAndUpdate({ id }, {comments: newCommentsArray});
        }
        res.redirect(`/films/${id}`)
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;