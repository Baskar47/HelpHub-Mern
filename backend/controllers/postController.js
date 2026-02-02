const Post = require("../models/postSchema");

/**
 * CREATE POST
 * Who posted? -> req.user.id
 */
exports.createPost = async (req, res, next) => {
  try {
    let post = await Post.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      createdBy: req.user.id
    })
    post=await post.populate("createdBy", "name email");
    res.status(201).json({
      success: true,
      data: post
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET ALL POSTS
 * Show latest first + show user info
 */
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("createdBy", "_id name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: posts
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET SINGLE POST
 */
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    next(err);
  }
};

/**
 * UPDATE POST
 * Only creator can update
 */
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // 🔐 ownership check
    if (post.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to update this post"
      });
    }

    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;
    post.category = req.body.category || post.category;
    post.status = req.body.status || post.status;

    const updatedPost = await post.save();

    res.status(200).json({
      success: true,
      data: updatedPost
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE POST
 * Only creator can delete
 */
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to delete this post"
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};
