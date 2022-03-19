// films/:id/details

const router = require("express").Router();

const Film = require("../models/Film.model");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");


//check case for keys
router.post("/films/:id", async (req, res, next) => {
  const id = req.params.id;
  console.log("req.session", req.session);
  const username = req.session.currentUser.username; // <== Look this
  const { content } = req.body; // <== And this

  try {
    const commentCreatedID = await Comment.create({ username, content });

    const isMovieExistInDataBase = await Film.findOneAndUpdate(
      { id: id },
      { $push: { comments: commentCreatedID._id } },
      { new: true }
    );
    if (!isMovieExistInDataBase) {
      await Film.create({ id: id });
      await Film.findOneAndUpdate(
        { id: id },
        { $push: { comments: commentCreatedID._id } },
        { new: true }
      );
    }

    res.redirect(`/films/${id}`);
  } catch (err) {
    console.log(err);
  }

});


// router.get("edit-comment", async (req, res, next) => {

// })

module.exports = router;
