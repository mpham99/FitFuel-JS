const express = require("express");
const app = express();
var router = express.Router();
const Model = require("./../models/home.js");
// const mustacheExpress = require("mustache-express");

router.get("/", async function(req,res){
    req.TPL.userInfo = await Model.getUserInfo();
    res.render("home_page", req.TPL);
});

router.post("/form_entry", async function(req, res) {
    // function formVerification(){

    // };
    console.log("Storing User Settings and Information");
    await Model.addUserInfo(req.body);
    res.redirect("/home");
});

router.get("/logout", async function(req, res)
{
//   delete(req.session.username);
  res.redirect("/login");
});

module.exports = router;