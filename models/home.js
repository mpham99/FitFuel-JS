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

async function getUserInfo() {
    const results = await db.all("SELECT * FROM Information");
    return results
};

async function addUserInfo(params) {
    const data = await db.all("UPDATE Information SET goal = ?, sex = ?, macroPriority = ?, age = ?, weight = ?", params["Goal"], params["Sex"],params["Diet"],params["age"],params["weight"]);
};

module.exports = {getUserInfo, addUserInfo};