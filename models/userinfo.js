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

async function createUserInfo(params, username) {
    await db.run("INSERT INTO Information VALUES (?,?,?,?,?,?)",
        [params["Goal"], params["Sex"],params["Diet"],params["age"], 0, username]);
}

async function updateUserInfoWithoutWeight(params, username) {
    await db.run("UPDATE Information SET goal = ?, sex = ?, macroPriority = ?, age = ? WHERE username = ?",
        [params["Goal"], params["Sex"],params["Diet"],params["age"], username]);
}

async function updateUserWeight(weight, username) {
    await db.run("UPDATE Information SET weight = ? WHERE username = ?",
        [weight, username]);
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

module.exports = {getUserInfo, createUserInfo, updateUserInfoWithoutWeight, getUserByUsername, transformValue, updateUserWeight};