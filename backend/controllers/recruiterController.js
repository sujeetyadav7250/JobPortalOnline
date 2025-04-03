const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Recruiter = require("../models/Recruiter");

exports.registerRecruiter = async (req, res) => {
  const { name, email, password, companyLogo } = req.body;
  
  try {
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newRecruiter = await Recruiter.create({
      name,
      email,
      password: hashedPassword,
      companyLogo,
    });

    res.status(201).json({ message: "Recruiter Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.loginRecruiter = async (req, res) => {
  const { email, password } = req.body;

  try {
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign({ id: recruiter._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login Successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
