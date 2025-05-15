const express = require("express");
const bodyParser = require("body-parser");


var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
var items = [];
var example="working";
app.get("/", function (req, res) {
    res.render("list", {ejes : items})
});


app.post("/", function (req, res) {
    var item = req.body.ele1;
    // Input validation: prevent blank or whitespace-only submissions
    if (item && item.trim() !== "") {
        items.push(item.trim());
    }
    res.redirect("/");
});

app.listen(8000, function () {
    console.log("Server is started");
});