const { Course } = require("../modules/index");

async function allCourse(req, res) {
  try {
    const courses = await Course.find();
    if (!courses.length) {
      return res.status(404).json({ message: "No courses found" });
    }
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error); // Log the error to the console
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

module.exports = { allCourse };
