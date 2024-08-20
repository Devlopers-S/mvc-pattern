const express = require("express");
const {
  adminSignup,
  adminLogin,
  updateAdmin,
  addCourse,
  allUsers,
  DeleteUser,
  updateCourse,
} = require("../controllers/admin");

const router = express.Router();

// Routes
router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.put("/adminUpdate", updateAdmin);
router.post("/addCourse", addCourse);
router.get("/allUsers", allUsers);
router.delete("/delete", DeleteUser);
router.put("/UpdateCourse", updateCourse);
router.delete("/DeleteCourse", DeleteUser);

module.exports = router;
