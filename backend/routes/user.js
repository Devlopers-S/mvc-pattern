const express = require("express");
const {
  userSignUp,
  userLogin,
  userUpdate,
  purchaseCourse,
  completeCourse,
} = require("../controllers/user");
const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.put("/update", userUpdate);
router.post("/purchase", purchaseCourse);
router.post("/complete", completeCourse);

module.exports = router;
