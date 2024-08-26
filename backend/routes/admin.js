const express = require("express");
const {
  adminSignup,
  adminLogin,
  updateAdmin,
  addCourse,
  allUsers,
  DeleteUser,
  updateCourse,
  DeleteCourse,
} = require("../controllers/admin");

const router = express.Router();

// Routes
router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.put("/adminUpdate", updateAdmin);
router.post("/addCourse", addCourse);
router.get("/allUsers", allUsers);
router.post("/UpdateCourse/:CourseId", updateCourse);
router.delete("/delete", DeleteUser);
router.delete("/DeleteCourse", DeleteCourse);

module.exports = router;
