const express = require("express");
const router = express.Router();
const controller = require("../controllers/campground");
const Campground = require("../models/campground");

router.get("/", controller.index);

router.get("/new", controller.new);

router.post("/new", controller.postNew);

router.get("/:id", controller.show);

router.get("/:id/edit", controller.edit);

router.put("/:id", controller.putEdit);

router.delete("/:id", controller.delete);

module.exports = router;