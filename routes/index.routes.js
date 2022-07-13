const router = require("express").Router();
const ApiIS = require("../services/is-api.service");

const apiIS = new ApiIS();

router.get("/", async (req, res, next) => {
  try {
    const resFromApi = await apiIS.getFilms();
    const films = resFromApi.data.movies;
    res.render("index", { films });
  } catch (error) {
    console.log(error);
    res.render("index", null);
  }
});

module.exports = router;
