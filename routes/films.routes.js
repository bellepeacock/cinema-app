const router = require("express").Router();
const ApiIS = require("../services/is-api.service");
const hbs = require("hbs");

const Film = require("../models/Film.model");
const Comment = require("../models/Comment.model");

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
    res.render("film-views/films", { films });
  } catch (error) {
    console.log(error);
  }
});

router.post("/films", async (req, res, next) => {
    const { title, language } = req.body;
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
  const currentUser = req.session.currentUser;

  const filmId = req.params.id;
  try {
    //Obtaining the info (film details) from the API
    const resFromApi = await apiIS.getFilmById(filmId);
    const filmFromAPI = resFromApi.data.movie;

    checkImage(filmFromAPI);
    
    //The API returns all of the cast, but I only want to show a few of them.
    //The slice is to get the first ten.
    const cast = [...filmFromAPI.cast].slice(0, 10);
    filmFromAPI.cast = cast;

    //Obtaining the info of the comments
    Film.findOne({ id: filmId })
      .populate({
        path: "comments",
        populate: {
          path: "username",
        },
      })
      .then((filmFromDbWithComments) => {
          if (filmFromDbWithComments !== null) {
            filmFromDbWithComments = filmFromDbWithComments.comments.map(
            (element) => {
                console.log("element",element);
                if (element.username === currentUser) {
                return {
                    username: element.username,
                    content: element.content,
                    isUserName: true,
                    filmId: filmId,
                    id:element._id
                };
                } else {
                return {
                    username: element.username,
                    content: element.content,
                    isUserName: false,
                    filmId: filmId,
                    id:element._id
                };
                }
            }
            );
          }
        
        res.render("film-views/film-details", {
          filmFromAPI,
          filmFromDbWithComments,
          currentUser,
        });
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/films/:id/edit", async (req, res, next) => {
  const currentUser = req.session.currentUser.username;
  console.log("currentUser", currentUser);

  const filmId = req.params.id;
  try {
    //Obtaining the info (film details) from the API
    const resFromApi = await apiIS.getFilm(filmId);
    const filmFromAPI = resFromApi.data.movie;

    //The API returns all of the cast, but I only want to show a few of them.
    //The slice is to get the first ten.
    const cast = [...filmFromAPI.cast].slice(0, 10);
    filmFromAPI.cast = cast;

    //Obtaining the info of the comments
    Film.findOne({ id: filmId })
      .populate({
        path: "comments",
        populate: {
          path: "username",
        },
      })
      .then((filmFromDbWithComments) => {
        filmFromDbWithComments = filmFromDbWithComments.comments.map(
          (element) => {
            if (element.username === currentUser) {
              return {
                username: element.username,
                content: element.content,
                isUserName: true,
                filmId: filmId,
                id: element._id,
              };
            } else {
              return {
                username: element.username,
                content: element.content,
                isUserName: false,
                filmId: filmId,
                id: element._id,
              };
            }
          }
        );

        res.render("film-views/film-edit-comment", {
          filmFromAPI,
          filmFromDbWithComments,
          currentUser,
        });
      });
  } catch (error) {
    console.log(error);
  }
});

router.post("/films/:id/edit", async (req, res, next) => {
  console.log("id", req.params.id);
  console.log("req.body.editInput", req.body.editInput);
  const id = req.params.id;
  const content = req.body.editInput
  Comment.findByIdAndUpdate(id,{content})
    .then((e) => {
      console.log("successs===========>",e);
      res.redirect(`/films/${req.body.filmID}`)

    })
    .catch((error) => {
      console.log("errror====>", error);
    });
});

router.post("/films/:id/delete/:filmId", async (req, res, next) => {
    Comment.findByIdAndDelete(req.params.id)
        .then( ()=>{
            console.log("delted")
            res.redirect(`/films/${req.params.filmId}`)
        }).catch(error => (console.log(error)))
});
    // delete function need comment objec id - this{{id}}


module.exports = router;

// do a get request that for the filters that adds them to the URL, so it'll be localhost30000/berlin/english
