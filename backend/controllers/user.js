const { Config } = require("../helper");
const { User } = require("../modules/index");
const { Course } = require("../modules/index");

async function userSignUp(req, res) {
  const { name, email, password } = req.body;

  const con = await Config.findOne({ Id: "1" });

  var ii = String(Number(con.totalUser) + 1);

  const user = new User({ Id: ii, name, email, password });

  con.totalUser = String(Number(con.totalUser) + 1);
  con.save().then((data) => {
    console.log("done");
  });

  user
    .save()
    .then((data) => res.status(200).send({ message: "User created", data }))
    .catch((err) => {
      if (err.code === 11000) {
        res.status(400).send({ message: "User already exists", error: err });
      } else {
        res.status(500).send({ message: "Internal Server Error", error: err });
      }
    });
}

async function userLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }
    res.json({ message: "Login Successful", email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function userUpdate(req, res) {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

async function purchaseCourse(req, res) {
  try {
    const { email, courseId } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the course is already purchased by the user
    const alreadyPurchased = user.purchase.some((p) => p.CourseId === courseId);
    if (alreadyPurchased) {
      return res.status(400).json({ message: "Course already purchased" });
    }

    // Find the course by courseId
    const course = await Course.findOne({ CourseId: courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Add the course to the user's purchase array
    user.purchase.push(course);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Course purchased successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
    console.error(error);
  }
}

async function getPurchaseCourses(req, res) {
  const email = req.query.email; // Since it's a GET request, use query parameters
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json(user.purchase); // Send only the purchased courses array
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
async function getCourse(req, res) {
  const { CourseId } = req.params;
  const course = await Course.findOne({ CourseId });
  res.status(200).json(course);
}
async function completeCourse(req, res) {
  try {
    const { email, courseId } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the course is already completed by the user
    const alreadyComplete = user.complete.some((c) => c.courseId === courseId);
    if (alreadyComplete) {
      return res.status(400).json({ message: "Course already completed" });
    }

    // Find the course by courseId
    const course = await Course.findOne({ CourseId: courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Add the course to the user's complete array
    user.complete.push({ courseId: courseId, completed: true });

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Course completed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
    console.error(error);
  }
}

module.exports = {
  userSignUp,
  userLogin,
  userUpdate,
  getCourse,
  purchaseCourse,
  completeCourse,
  getPurchaseCourses,
};
