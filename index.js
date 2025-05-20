const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override"); // <-- Add this

var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // <-- Add this

var items = [];

app.get("/", function (req, res) {
    const filter = req.query.filter || "all";
    let filteredItems = items;
    if (filter !== "all") {
        filteredItems = items.filter(item => item.priority === filter);
    }
    res.render("list", { ejes: filteredItems, editIndex: null, filter });
});

app.post("/", function (req, res) {
    var item = req.body.ele1;
    var priority = req.body.priority || "medium";
    if (item && item.trim() !== "") {
        items.push({ title: item.trim(), priority });
    }
    res.redirect("/");
});

app.delete("/delete", function (req, res) {
    const index = parseInt(req.body.index);
    if (!isNaN(index)) {
        items.splice(index, 1);
    }
    res.redirect("/");
});

app.post("/edit", function (req, res) {
    const index = parseInt(req.body.index);
    const filter = req.body.filter || "all";
    let filteredItems = items;
    if (filter !== "all") {
        filteredItems = items.filter(item => item.priority === filter);
    }
    res.render("list", { ejes: filteredItems, editIndex: index, filter });
});

app.put("/update", function (req, res) {
    const index = parseInt(req.body.index);
    const newTitle = req.body.newTitle;
    const newPriority = req.body.newPriority || "medium";
    if (!isNaN(index) && newTitle && newTitle.trim() !== "") {
        items[index].title = newTitle.trim();
        items[index].priority = newPriority;
    }
    res.redirect("/");
});

app.listen(8000, function () {
    console.log("Server is started");
});