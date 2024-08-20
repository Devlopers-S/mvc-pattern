const express = require("express");
const cors = require("cors");
const { mongodbConnect } = require("./connection");
const Users = require("./routes/user");
const Admin = require("./routes/admin");
const Course = require("./routes/course");

const app = express();
const port = 4000;

// Connect to MongoDB
mongodbConnect("mongodb+srv://sumit:sumit786@cluster0.go6grlb.mongodb.net/");

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/user", Users);
app.use("/admin", Admin);
app.use("/course", Course);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
