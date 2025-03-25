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
}

init();

async function addWeight(weight, username) {
    await db.run("INSERT INTO WeightLog (weight, username) VALUES (?, ?)",
        [weight, username]);
}

async function getAllWeights(username) {
    return await db.all("SELECT date, weight FROM WeightLog WHERE username = ? ORDER BY date DESC",
        [username]);
}

module.exports = {addWeight, getAllWeights};