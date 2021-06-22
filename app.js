const express = require("express");
const path = require("path");
const { join } = require("path");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/campground", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Database connected");
});

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

const port = 3000;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});