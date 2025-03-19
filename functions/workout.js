const fs = require("fs");
const mustache = require("mustache");

exports.handler = async () => {
    const template = fs.readFileSync("./views/workout.mustache", "utf8");
    const html = mustache.render(template, { workoutnav: true });

    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html" },
        body: html
    };
};