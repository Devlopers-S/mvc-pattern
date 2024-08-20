const mongoose = require("mongoose");

// Connect to MongoDB
async function mongodbConnect(url) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

module.exports = { mongodbConnect };

