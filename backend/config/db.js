const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/onlinejobportal"
);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ Error in DB Connection:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
