const express = require("express");
const app = express();
var router = express.Router();
const Model = require("./../models/calculator.js");
// const mustacheExpress = require("mustache-express");

const breakfast = 0;
const lunch = 1;
const dinner = 2;

//Render page
router.get("/", async function(req,res){
    req.TPL.displayFormLink = !req.session.DisplayCloseLink;
    req.TPL.displayCloseLink = req.session.DisplayCloseLink;
    req.TPL.dinnerFood = await Model.getDinnerInfo();
    req.TPL.lunchFood = await Model.getLunchInfo();
    req.TPL.breakfastFood = await Model.getBreakfastInfo();
    req.TPL.totals = await Model.getTotals();
    req.TPL.Dinner = req.session.dinner;
    req.TPL.Lunch = req.session.lunch;
    req.TPL.Breakfast = req.session.breakfast;
    req.TPL.SavedMeals = await Model.getSavedMeals();
    res.render("calculator_page", req.TPL);
});

//Allows Food Forms to become visible to the user
router.get("/addBreakfastForm", async function(req,res) {
    req.session.DisplayCloseLink = true;
    req.session.DisplayFormLink = false;
    req.session.breakfast = true;
    req.session.lunch = true;
    req.session.dinner = true;
    res.redirect("/calculator");
});

//Removes the Breakfast Form from the view
router.get("/closeBreakfastForm", async function(req,res) {
    req.session.DisplayCloseLink = false;
    req.session.DisplayFormLink = true;
    req.session.breakfast = false;
    req.session.lunch = false;
    req.session.dinner = false;
    res.redirect("/calculator");
});

//Adds a food to Breakfast Table
router.post("/addBreakfast", async function(req,res) {
    console.log("Adding Meal to Breakfast");
    const params = await JSON.stringify(req.body);
    await Model.addBreakfastInfo(req.body);
    res.redirect("/calculator");
});

//Adds a food to Lunch Table
router.post("/addLunch", async function(req,res) {
    console.log("Adding Meal to Lunch");
    const params = await JSON.stringify(req.body);
    await Model.addLunchInfo(req.body);
    res.redirect("/calculator");
});

//Adds a food to Dinner Table
router.post("/addDinner", async function(req,res) {
    console.log("Adding Meal to Dinner");
    const params = await JSON.stringify(req.body);
    await Model.addDinnerInfo(req.body);
    res.redirect("/calculator");
});

//Saves Food to Saved Meals from Breakfast
router.get("/saveBreakfastInfo/:id", async function(req,res){
    console.log("Saving Meal from Breakfast");
    await Model.saveMeal(breakfast, req.params.id);
    res.redirect("/calculator");
});

//Saves Food to Saved Meals from Lunch
router.get("/saveLunchInfo/:id", async function(req,res){
    console.log("Saving Meal from Lunch");
    await Model.saveMeal(lunch, req.params.id);
    res.redirect("/calculator");
});

//Saves Food to Saved Meals from Dinner
router.get("/saveDinnerInfo/:id", async function(req,res){
    console.log("Saving Meal from Dinner");
    await Model.saveMeal(dinner, req.params.id);
    res.redirect("/calculator");
});

//Applies Food from Saved Meals to Breakfast
router.get("/deployMealBreakfast/:id", async function(req,res){
    console.log("Deploying Meal to Breakfast");
    await Model.deployMealBreakfast(req.params.id);
    res.redirect("/calculator");
});

//Applies Food from Saved Meals to Lunch
router.get("/deployMealLunch/:id", async function(req,res){
    console.log("Deploying Meal to Lunch");
    await Model.deployMealLunch(req.params.id);
    res.redirect("/calculator");
});

//Applies Food from Saved Meals to Dinner
router.get("/deployMealDinner/:id", async function(req,res){
    console.log("Deploying Meal to Dinner");
    await Model.deployMealDinner(req.params.id);
    res.redirect("/calculator");
});

//Deletes a Food from Breakfast
router.get("/deleteBreakfastInfo/:id", async function(req,res){
    console.log("Deleting Meal from Breakfast");
    await Model.deleteBreakfastInfo(req.params.id);
    res.redirect("/calculator");
});

//Deletes a Food from Lunch
router.get("/deleteLunchInfo/:id", async function(req,res){
    console.log("Deleting Meal from Lunch");
    await Model.deleteLunchInfo(req.params.id);
    res.redirect("/calculator");
});

//Deletes a Food from Dinner
router.get("/deleteDinnerInfo/:id", async function(req,res){
    console.log("Deleting Meal from Dinner");
    await Model.deleteDinnerInfo(req.params.id);
    res.redirect("/calculator");
});

//Deletes a Food from SavedMeals
router.get("/deleteSavedMeals/:id", async function(req,res){
    console.log("Deleting Meal from Saved Meals");
    await Model.deleteSavedMeal(req.params.id);
    res.redirect("/calculator");
});

//Clears the Breakfast Table
router.get("/deleteBreakfast", async function(req, res){
    console.log("Deleting Breakfast Table");
    await Model.deleteBreakfast();
    res.redirect("/calculator");
});

//Clears the Lunch Table
router.get("/deleteLunch", async function(req, res){
    console.log("Deleting Lunch Table");
    await Model.deleteLunch();
    res.redirect("/calculator");
});

//Clears the Dinner Table
router.get("/deleteDinner", async function(req, res){
    console.log("Deleting Dinner Table");
    await Model.deleteDinner();
    res.redirect("/calculator");
});

module.exports = router;