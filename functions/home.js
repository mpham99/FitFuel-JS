const fs = require("fs");
const path = require("path");
const mustache = require("mustache");

exports.handler = async () => {
    const templatePath = path.join(__dirname, "../views/home_page.mustache");

    try {
        const template = fs.readFileSync(templatePath, "utf8");
        const html = mustache.render(template, { workoutnav: true });

        return {
            statusCode: 200,
            headers: { "Content-Type": "text/html" },
            body: html
        };
    } catch (error) {
        console.error("Error loading template:", error);
        return { statusCode: 500, body: "Internal Server Error" };
    }
};