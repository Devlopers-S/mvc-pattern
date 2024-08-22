const mongoose = require("mongoose");
const { mongodbConnect } = require("./connection");

// Connect to MongoDB

mongodbConnect("mongodb+srv://sumit:sumit786@cluster0.go6grlb.mongodb.net/");

const configSchema = new mongoose.Schema({
  totalUser: String,       
  totalCourse: String,
  Id: String,
  totalAdmin: String,
});

const Config = new mongoose.model("Config", configSchema);

const Con = new Config({            
  Id: "1",
  totalUser: "0",
  totalCourse: "0",
  totalAdmin: "0",
});

Con.save();

module.exports = {
  Config,
};
