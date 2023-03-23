const express = require("express");
const app = express();
const path = require("path");
const myBot = require("../index");
const bodyParser = require("body-parser");
const config = require("../config");

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// home page
app.get("/", async (req, res) => {
    res.render("index", {myBot: myBot});
});

// commands page
app.get("/commands", async (req, res) => {
    res.render("commands", {myBot: myBot});
});

// login page
app.get("/auth/login", async (req, res) => {
    res.render("login", {myBot: myBot});
});
app.post("/auth/login", async (req, res) => {
    res.redirect("/dashboard");
});


// dashboard pages
app.get("/dashboard", async (req, res) => {
    res.render("dashboard/index", {myBot: myBot});
});
app.get("/dashboard/:serverId", async (req, res) => {
    res.render("dashboard/server", {myBot: myBot});
});

// connect
app.listen(config.dashboardPort, () => {
    console.info("Dashboard running on http://localhost:" + config.dashboardPort + "/");
});
