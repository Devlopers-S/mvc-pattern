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
    const aCourse = await Course.findOne({ CourseId: courseId });
    if (aCourse == user.purchase) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("user : ", user);
    console.log("aCourse : ", aCourse);
    // Add the productId to the purchase array
    user.purchase.push(aCourse);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Course purchased successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
    console.log(error);
  }
}

async function completeCourse(req, res) {
  const { email, courseId } = req.body;
  const user = await User.findOne({ email });
  user.complete.push(courseId);
  await user.save();
  res.status(200).json({ message: "Course completed successfully" });
}

module.exports = {
  userSignUp,
  userLogin,
  userUpdate,
  purchaseCourse,
  completeCourse,
};
