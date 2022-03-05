const router = require('express').Router();

router.get("/", (req, res, next) => {
    console.log('index')
    res.render("index");
});

module.exports = router;