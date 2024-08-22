const express = require("express");
const {
  userSignUp,
  userLogin,
  userUpdate,
  purchaseCourse,
  completeCourse,
  getPurchaseCourses,
} = require("../controllers/user");
const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.put("/update", userUpdate);
router.post("/purchase", purchaseCourse);
router.post("/complete", completeCourse);
router.post("/purchaseCourses", getPurchaseCourses);
router.get("/getPurchaseCourses", getPurchaseCourses);
module.exports = router;
