var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("site.db");

db.serialize(function() {

  // create information table
  db.run("DROP TABLE IF EXISTS Information");
  db.run("CREATE TABLE Information (goal INTEGER, sex INTEGER, macroPriority INTEGER," + 
                                   "age INTEGER, weight REAL, username TEXT)");

  db.run("INSERT INTO Information VALUES (?,?,?,?,?,?)", [1,1,1,40,180.5, "test3"]);

  // create breakfast table
  db.run("DROP TABLE IF EXISTS Breakfast");
  db.run("CREATE TABLE Breakfast (Name TEXT, Protein INTEGER, Fat INTEGER," + 
                                   "Carbs INTEGER, Cals INTEGER)");

  db.run("INSERT INTO Breakfast VALUES (?,?,?,?,?)", ["Sardines",16,8,0,130]);

  // create lunch table
  db.run("DROP TABLE IF EXISTS Lunch");
  db.run("CREATE TABLE Lunch (Name TEXT, Protein INTEGER, Fat INTEGER," + 
                                  "Carbs INTEGER, Cals INTEGER)");

  db.run("INSERT INTO Lunch VALUES (?,?,?,?,?)", ["Sardines",16,8,0,130]);

    // create Dinner table
  db.run("DROP TABLE IF EXISTS Dinner");
  db.run("CREATE TABLE Dinner (Name TEXT, Protein INTEGER, Fat INTEGER," + 
                                   "Carbs INTEGER, Cals INTEGER)");

  db.run("INSERT INTO Dinner VALUES (?,?,?,?,?)", ["Sardines",16,8,0,130]);

  // create saved meals table
  db.run("DROP TABLE IF EXISTS SavedMeals");
  db.run("CREATE TABLE SavedMeals (Name TEXT, Protein INTEGER, Fat INTEGER," + 
                                    "Carbs INTEGER, Cals INTEGER)");

  db.run("INSERT INTO SavedMeals VALUES (?,?,?,?,?)", ["Sardines",16,8,0,130]);
});