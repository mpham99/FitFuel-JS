const express = require("express");
const app = express();
const session = require("express-session");
const mustacheExpress = require("mustache-express");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({secret: 'keyboard cat'
    ,resave: false
    ,saveUninitialized:false}))

app.use(function(req,res,next) {
    req.TPL = {};
    
    
    next();
    });

app.use("/home", async function(req, res, next) {
    req.TPL.workoutnav = true; next();
});
app.use("/calculator", function(req, res, next) {
    req.TPL.calculatornav = true; next();
});
app.use("/workout", function(req, res, next) {
    req.TPL.workoutnav = true; next();
});
app.use("/login", function(req, res, next) {
    req.TPL.loginnav = true; next();
});

app.use("/login", require("./controllers/login"));
app.use("/home", require("./controllers/home"));
app.use("/calculator", require("./controllers/calculator"));
app.use("/workout", require("./controllers/workout"));

app.get("/", function(req, res) {
    res.redirect("/login");
});
app.get(/^(.+)$/, function(req, res) {
    res.sendFile( __dirname + req.params[0]);
});


var server = app.listen(8081, function() {console.log("Server listening...");})