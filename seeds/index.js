const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

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

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000 + 1);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            location: `${cities[random1000].city},${cities[random1000].state} `,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://source.unsplash.com/WLUHO9A_xik/1600x900`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit aspernatur,sit ex ad fugit suscipit alias libero fuga sed dolorem obcaecati, quia vitae totam ratione. Unde iste laudantium ipsa aliquam.",
            price,
        });
        await camp.save();
    }
};
seedDB();