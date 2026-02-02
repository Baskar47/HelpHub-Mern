const Solution = require("../models/solutionSchema");

/**
 * CREATE SOLUTION
 * Who commented? -> req.user.id
 */
exports.createSolution = async (req, res, next) => {
  try {
    const solution = await Solution.create({
      solutionText: req.body.solutionText,
      problemId: req.body.problemId,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: solution
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET SOLUTIONS BY PROBLEM ID
 */
exports.getSolutionsByProblem = async (req, res, next) => {
  try {
    const solutions = await Solution.find({
      problemId: req.params.id
    })
      .populate("createdBy", "name email")
      .populate("replies.user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: solutions
    });
  } catch (err) {
    next(err);
  }
};

/**
 * UPDATE SOLUTION
 * Only solution owner
 */
exports.updateSolution = async (req, res, next) => {
  try {
    const solution = await Solution.findById(req.params.id);

    if (!solution) {
      return res.status(404).json({ message: "Solution not found" });
    }

    if (solution.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to update this solution"
      });
    }

    solution.solutionText =
      req.body.solutionText || solution.solutionText;

    const updatedSolution = await solution.save();

    res.status(200).json({
      success: true,
      data: updatedSolution
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE SOLUTION
 * Only solution owner
 */
exports.deleteSolution = async (req, res, next) => {
  try {
    const solution = await Solution.findById(req.params.id);

    if (!solution) {
      return res.status(404).json({ message: "Solution not found" });
    }

    if (solution.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to delete this solution"
      });
    }

    await solution.deleteOne();

    res.status(200).json({
      success: true,
      message: "Solution deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};

/**
 * LIKE / UNLIKE SOLUTION
 */
exports.toggleLike = async (req, res, next) => {
  try {
    const solution = await Solution.findById(req.params.id);

    if (!solution) {
      return res.status(404).json({ message: "Solution not found" });
    }

    const userId = req.user.id;

    const alreadyLiked = solution.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      // UNLIKE
      solution.likes = solution.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // LIKE
      solution.likes.push(userId);
    }

    await solution.save();

    res.status(200).json({
      success: true,
      likesCount: solution.likes.length,
      liked: !alreadyLiked
    });
  } catch (err) {
    next(err);
  }
};
exports.toggleDislike = async (req, res, next) => {
  try {
    const solution = await Solution.findById(req.params.id);

    if (!solution) {
      return res.status(404).json({ message: "Solution not found" });
    }

    const userId = req.user.id;

    const alreadyDisliked = solution.dislikes.some(
      (id) => id.toString() === userId
    );

    if (alreadyDisliked) {
      // UNDISLIKE
      solution.dislikes = solution.dislikes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // DISLIKE
      solution.dislikes.push(userId);

      // optional: remove like if exists
      solution.likes = solution.likes.filter(
        (id) => id.toString() !== userId
      );
    }

    await solution.save();

    res.status(200).json({
      success: true,
      dislikesCount: solution.dislikes.length,
      disliked: !alreadyDisliked
    });
  } catch (err) {
    next(err);
  }
};

