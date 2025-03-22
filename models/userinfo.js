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

async function getUserInfo() {
    return await db.all("SELECT * FROM Information")
}

async function addUserInfo(params) {
    const data = await db.all("UPDATE Information SET goal = ?, sex = ?, macroPriority = ?, age = ?, weight = ?",
        params["Goal"], params["Sex"],params["Diet"],params["age"],params["weight"]);
}

async function getUserByUsername(username) {
    return await db.get(
        "SELECT * FROM Information WHERE username = ?",
        [username]
    );
}

function transformValue(input) {
    const mappings = {
        goal: {
            0: "Fat Loss",
            1: "Maintain Weight",
            2: "Gain Muscle"
        },
        sex: {
            0: "Female",
            1: "Male"
        },
        macroPriority: {
            0: "Lower Carb",
            1: "Moderate Carb",
            2: "Higher Carb"
        }
    };

    const transformed = {};

    for (const key in input) {
        if (Object.hasOwn(mappings, key)) {
            const value = input[key];
            const numericValue = typeof value === "string" ? parseInt(value, 10) : value;
            transformed[key] = mappings[key][numericValue] ?? "Unknown";
        } else {
            // Copy any unmapped fields as-is
            transformed[key] = input[key];
        }
    }

    return transformed;
}

module.exports = {getUserInfo, addUserInfo, getUserByUsername, transformValue};