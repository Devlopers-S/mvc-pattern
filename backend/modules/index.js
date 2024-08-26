const mongoose = require("mongoose");

// Define User schema
const userSchema = new mongoose.Schema({
  Id: String,
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  purchase: { type: Array, default: [] },
  complete: { type: Array, default: [] },
});

// Define Admin schema
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  adminId: { type: String, required: true },
});

// Define Course schema
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  CourseId: { type: String, required: true },
  complete: { type: Boolean, default: false },
});

// Model creation
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = { User, Admin, Course };
