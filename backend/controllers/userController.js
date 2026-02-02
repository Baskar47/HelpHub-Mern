const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post=require('../models/postSchema')
const Solution=require('../models/solutionSchema')


// =======================
// REGISTER
// =======================
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Register success",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};


// =======================
// LOGIN
// =======================
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found, please register",
      });
    }

  


    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }
    });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res) => {
   try {
    // 🔥 THIS CHECK IS IMPORTANT
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const user = await User.findById(req.user._id).select("-password");

    const myProblems = await Post.find({ createdBy: req.user._id });
    const mySolutions = await Solution.find({ createdBy: req.user._id });

    res.status(200).json({
      success: true,
      user,
      myProblems,
      mySolutions
    });
  } catch (error) {
    console.log("PROFILE ERROR 👉", error.message);
    res.status(500).json({ message: error.message });
  }
};


const updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name: req.body.name },
    { new: true }
  );

  res.json({ user });
};





module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};
