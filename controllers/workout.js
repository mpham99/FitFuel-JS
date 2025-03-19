const express = require("express");
const app = express();
var router = express.Router();
// const Model = require("./../models/workout.js");
// const mustacheExpress = require("mustache-express");

router.get("/", async function(req,res){
    res.render("workout_page", req.TPL);
});

module.exports = router;