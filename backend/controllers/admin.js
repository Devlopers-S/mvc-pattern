const { Admin, Course, User } = require("../modules/index");

// Admin Signup
function adminSignup(req, res) {
  const { name, email, password } = req.body;
  const newAdmin = new Admin({ name, email, password });

  newAdmin
    .save()
    .then((data) => res.status(200).send({ message: "Admin created", data }))
    .catch((err) => {
      if (err.code === 11000) {
        res.status(400).send({ message: "Admin already exists", error: err });
      } else {
        res.status(500).send({ message: "Internal Server Error", error: err });
      }
    });
}

// Admin Login
async function adminLogin(req, res) {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (admin.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Login Successful", email: admin.email });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// Update Admin Password
async function updateAdmin(req, res) {
  const { email, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    admin.password = newPassword;
    await admin.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

function addCourse(req, res) {
  const { name, price, description, courseId } = req.body;

  const newCourse = new Course({
    name,
    price,
    description,
    CourseId: courseId,
  });

  newCourse
    .save()
    .then((data) => res.status(200).send({ message: "Course created", data }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error", error: err });
    });
}

async function updateCourse(req, res) {
  try {
    // Extract CourseId and the fields to update from the request body
    const { CourseId, name, price, description } = req.body;

    // Find the course by CourseId and update it
    const updatedCourse = await Course.findOneAndUpdate(
      { CourseId },
      { name, price, description },
      { new: true } // This option returns the updated document
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res
      .status(200)
      .json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}



async function allUsers(req, res) {
  try {
    const allUser = await User.find();
    if (allUser.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(allUser);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}
async function DeleteUser(req, res) {
  try {
    const { email } = req.body;
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

module.exports = {
  adminSignup,
  adminLogin,
  updateAdmin,
  addCourse,
  allUsers,
  DeleteUser,
  updateCourse,
};
