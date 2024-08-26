const express = require("express");
const {
  userSignUp,
  userLogin,
  userUpdate,
  purchaseCourse,
  completeCourse,
  getPurchaseCourses,
  getCourse,
} = require("../controllers/user");
const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.put("/update", userUpdate);
router.post("/purchase", purchaseCourse);
router.post("/completeCourses", completeCourse);
router.post("/purchaseCourses", getPurchaseCourses);
router.get("/getPurchaseCourses", getPurchaseCourses);
router.get("/getCourse/:CourseId", getCourse);
module.exports = router;
