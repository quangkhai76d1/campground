const express = require("express");
const path = require("path");
const { join } = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const Campground = require("./models/campground");
const methodOverride = require("method-override");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.listen(3000, () => {
    console.log(`App listening at http://localhost:3000`);
});

app.get("/", (req, res) => {
    res.render("home");
});

const campgroundRouter = require("./routes/campground");
app.use("/campgrounds", campgroundRouter);

mongoose.connect("mongodb://localhost:27017/campground", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Database Connected");
});