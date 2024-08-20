const express = require("express");
const { allCourse } = require("../controllers/course");
const router = express.Router();

router.get("/allCourse",allCourse );

module.exports = router;