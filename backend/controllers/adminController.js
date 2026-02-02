const User = require("../models/userSchema");
const Post = require("../models/postSchema");
const Solution = require("../models/solutionSchema");

// ✅ Admin Dashboard Stats
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProblems = await Post.countDocuments();
    const totalSolutions = await Solution.countDocuments();

    res.status(200).json({
      success: true,
      data:{ totalUsers,
      totalProblems,
      totalSolutions}
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all problems
exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Post.find()
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      problems
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete a problem (admin power)
exports.deleteProblem = async (req, res) => {
  try {
    const problem = await Post.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    await problem.deleteOne();

    res.status(200).json({
      success: true,
      message: "Problem deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
