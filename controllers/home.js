const express = require("express");
const app = express();
var router = express.Router();
const UserInfoModel = require("../models/userinfo.js");
const WeightLogModel = require("../models/weightlog.js");
// const mustacheExpress = require("mustache-express");

router.get("/", async function(req,res){
    // Get user info
    let results = await UserInfoModel.getUserByUsername(req.session.username);
    if (results) req.TPL.userInfo = UserInfoModel.transformValue(results);
    // Get user weight records
    results = await WeightLogModel.getAllWeights(req.session.username);
    if (results) req.TPL.weightHistory = results;
    res.render("home_page", req.TPL);
});

router.post("/update_entry", async function(req, res) {
    await UserInfoModel.updateUserInfoWithoutWeight(req.body, req.session.username);
    res.redirect("/home");
});

router.post("/new_entry", async function(req, res) {
    await UserInfoModel.createUserInfo(req.body, req.session.username);
    res.redirect("/home");
});

router.post("/weight-entry", async (req, res) => {
    const username = req.session.username;
    const weight = req.body.newWeight;
    await WeightLogModel.addWeight(weight, username);
    await UserInfoModel.updateUserWeight(weight, username);
    res.redirect("/home");
});

router.get("/logout", async function(req, res)
{
//   delete(req.session.username);
  res.redirect("/login");
});

module.exports = router;