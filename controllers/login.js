const {BASE_URL, LOGIN_EP} = require("../constant");

const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async function(req, res) {
    res.render("login_page", req.TPL);
});

router.post("/", async function(req, res) {
    try {
        const { username, password } = req.body;

        // Make authentication API call
        const response = await axios.post(BASE_URL + LOGIN_EP, {
            username,
            password
        });

        if (response.data && response.data.accessToken) {
            req.session.accessToken = response.data.accessToken;
            res.redirect("/home");  // Redirect to home page upon success
        } else {
            req.TPL.error = "Invalid username or password.";
            res.render("login_page", req.TPL);  // Reload login page with error
        }
    } catch (error) {
        console.error("Login error:", error);
        req.TPL.error = "Authentication failed. Please try again.";
        res.render("login_page", req.TPL);
    }
});

module.exports = router;