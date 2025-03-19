const express = require("express");
const app = express();
var router = express.Router();
// const Model = require("./../models/login.js");
// const mustacheExpress = require("mustache-express");

router.get("/", async function(req,res){
    res.render("login_page", req.TPL);
});

module.exports = router;