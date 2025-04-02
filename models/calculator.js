const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

let db;

async function init(){
    try {
        db = await sqlite.open({
            filename: 'site.db',
            driver: sqlite3.Database
        });
    } catch (err) {
        console.error(err);
    }
    
};

init();

//Returns the Breakfast Table
async function getBreakfastInfo() {
    const results = await db.all("SELECT rowid, * FROM Breakfast");
    return results
};

//Adds a new food into Breakfast Table
async function addBreakfastInfo(params) {
    const data = await db.all("INSERT INTO Breakfast VALUES (?,?,?,?,?)", params["Name"], params["Protein"],params["Fat"],params["Carbs"],params["Cals"]);
};

//Deletes a food in the Breakfast Table
async function deleteBreakfastInfo(params) {
    const data = await db.run("DELETE FROM Breakfast WHERE rowid=?", [params]);
};

//Clears the whole Breakfast Table
async function deleteBreakfast() {
    const data = await db.run("DELETE FROM Breakfast");
};

//Returns the Lunch Table
async function getLunchInfo() {
    const results = await db.all("SELECT rowid, * FROM Lunch");
    return results
};

//Adds a new food into Lunch Table
async function addLunchInfo(params) {
    const data = await db.all("INSERT INTO Lunch VALUES (?,?,?,?,?)", params["Name"], params["Protein"],params["Fat"],params["Carbs"],params["Cals"]);
};

//Deletes a food in the Lunch Table
async function deleteLunchInfo(params) {
    const data = await db.run("DELETE FROM Lunch WHERE rowid=?", [params]);
};

//Clears the whole Lunch Table
async function deleteLunch() {
    const data = await db.run("DELETE FROM Lunch");
};

//Returns the Dinner Table
async function getDinnerInfo() {
    const results = await db.all("SELECT rowid, * FROM Dinner");
    return results
};

//Adds a new food into Dinner Table
async function addDinnerInfo(params) {
    const data = await db.all("INSERT INTO Dinner VALUES (?,?,?,?,?)", params["Name"], params["Protein"],params["Fat"],params["Carbs"],params["Cals"]);
};

//Deletes a food in the Dinner Table
async function deleteDinnerInfo(params) {
    const data = await db.run("DELETE FROM Dinner WHERE rowid=?", [params]);
};

//Clears the whole Dinner Table
async function deleteDinner() {
    const data = await db.run("DELETE FROM Dinner");
};

//Returns the Saved Meals Table
async function getSavedMeals() {
    const results = await db.all("SELECT rowid, * FROM SavedMeals");
    return results
};

//Saves a meal to the Saved Meals Table
async function saveMeal(table, params) {
    if (table == 0){
        const transfer = await db.all("SELECT * FROM Breakfast WHERE rowid=?", [params]);
        const data = await db.all("INSERT INTO SavedMeals VALUES (?,?,?,?,?)", transfer[0].Name, transfer[0].Protein,transfer[0].Fat,transfer[0].Carbs,transfer[0].Cals);
    }
    if (table == 1){
        const transfer = await db.all("SELECT * FROM Lunch WHERE rowid=?", [params]);
        const data = await db.all("INSERT INTO SavedMeals VALUES (?,?,?,?,?)", transfer[0].Name, transfer[0].Protein,transfer[0].Fat,transfer[0].Carbs,transfer[0].Cals);
    }
    if (table == 2){
        const transfer = await db.all("SELECT * FROM Dinner WHERE rowid=?", [params]);
        const data = await db.all("INSERT INTO SavedMeals VALUES (?,?,?,?,?)", transfer[0].Name, transfer[0].Protein,transfer[0].Fat,transfer[0].Carbs,transfer[0].Cals);
    }
};

//Deploys a meal to the Breakfast Table
async function deployMealBreakfast(params) {
    const transfer = await db.all("SELECT * FROM SavedMeals WHERE rowid=?", [params]);
    const data = await db.all("INSERT INTO Breakfast VALUES (?,?,?,?,?)", transfer[0].Name, transfer[0].Protein,transfer[0].Fat,transfer[0].Carbs,transfer[0].Cals);
    
};

//Deploys a meal to the Lunch Table
async function deployMealLunch(params) {
    const transfer = await db.all("SELECT * FROM SavedMeals WHERE rowid=?", [params]);
    const data = await db.all("INSERT INTO Lunch VALUES (?,?,?,?,?)", transfer[0].Name, transfer[0].Protein,transfer[0].Fat,transfer[0].Carbs,transfer[0].Cals);
    
};

//Deploys a meal to the Dinner Table
async function deployMealDinner(params) {
    const transfer = await db.all("SELECT * FROM SavedMeals WHERE rowid=?", [params]);
    const data = await db.all("INSERT INTO Dinner VALUES (?,?,?,?,?)", transfer[0].Name, transfer[0].Protein,transfer[0].Fat,transfer[0].Carbs,transfer[0].Cals);
    
};

//Deletes a meal from the Saved Meals Table
async function deleteSavedMeal(params) {
    const data = await db.run("DELETE FROM SavedMeals WHERE rowid=?", [params]);
};

//Adds a saved meal into desired table
async function deploySavedMeal(params) {
    const data = await db.all("SELECT * FROM SavedMeals WHERE rowid=?", [params]);
    // CREATE IF STATEMENT TO INSERT INTO CORRECT TABLE
    // await db.all("INSERT INTO Breakfast VALUES ()", params.);
};

//Returns the Totals from Breakfast, Lunch, Dinner
async function getTotals() {
    const breakfastTable = await db.all("Select * FROM Breakfast");
    const lucnhTable = await db.all("Select * FROM Lunch");
    const dinnerTable = await db.all("Select * FROM Dinner");
    
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;
    let totalCals = 0;

    await breakfastTable.forEach(element => {
        totalProtein = totalProtein + Number(element.Protein);
        totalFat = totalFat + Number(element.Fat);
        totalCarbs = totalCarbs + Number(element.Carbs);
        totalCals = totalCals + Number(element.Cals);
    });
    await lucnhTable.forEach(element => {
        totalProtein = totalProtein + Number(element.Protein);
        totalFat = totalFat + Number(element.Fat);
        totalCarbs = totalCarbs + Number(element.Carbs);
        totalCals = totalCals + Number(element.Cals);
    });
    await dinnerTable.forEach(element => {
        totalProtein = totalProtein + Number(element.Protein);
        totalFat = totalFat + Number(element.Fat);
        totalCarbs = totalCarbs + Number(element.Carbs);
        totalCals = totalCals + Number(element.Cals);
    });
  
    totals = [];
    totals.push(totalProtein,totalFat,totalCarbs,totalCals);
    return totals
};

module.exports = {getBreakfastInfo, addBreakfastInfo, deleteBreakfast, deleteBreakfastInfo, saveMeal, deleteSavedMeal, deleteDinner, deleteDinnerInfo, addDinnerInfo, getDinnerInfo, getLunchInfo, addLunchInfo, deleteLunch, deleteLunchInfo, deploySavedMeal, getSavedMeals, deployMealBreakfast, deployMealLunch, deployMealDinner, getTotals};