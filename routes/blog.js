const express = require("express");
const Auth = require("../middleware/auth");
const blogRouter = express.Router();
const Blog = require("../models/blog");

blogRouter.post("/", Auth, async (req, res) => {
  const newBlog = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    createdBy: req.user._id,
  };

  const blog = await Blog.create(newBlog);
  if (!blog) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "Blog added successfully",
      data: blog,
    });
  }
});

blogRouter.get("/", Auth, async (req, res) => {
  const blogDocs = await Blog.find({});
  if (!blogDocs) {
    return res.status(400).json({
      success: false,
      message: "No data found",
      data: null,
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "Blog Data",
      data: blogDocs,
    });
  }
});

module.exports = blogRouter;
