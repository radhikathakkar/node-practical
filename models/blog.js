const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: new Date()
    },
    status: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
  }
);

const Blog = (module.exports = mongoose.model("Blog", BlogSchema));
