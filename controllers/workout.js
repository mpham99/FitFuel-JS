const express = require("express");
const app = express();
var router = express.Router();
const Model = require("./../models/userinfo.js");
// const mustacheExpress = require("mustache-express");

router.get("/", async function(req,res){
    req.TPL.userInfo = await Model.getUserByUsername(req.session.username);
    res.render("workout_page", req.TPL);
});

module.exports = router;