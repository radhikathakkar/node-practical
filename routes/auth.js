const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.get("/test", (req, res) => {
  return res.status("200").send("working");
});
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userData = await User.findOne({
    email,
  });
  if (!userData) {
    return res.status(404).json({
      success: false,
      message: "User dose not exits",
      data: null,
    });
  } else {
    User.comparePassword(password, userData.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(
          {
            userid: userData._id.toString(),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            dob: userData.dob,
            role: userData.role,
          },
          process.env.JWT_TOKEN
        );
        return res.status(200).json({
          success: true,
          message: "User login successfully",
          data: token,
        });
      } else {
        return res.status(400).json({
          success: true,
          message: "Incorrect Password",
          data: null,
        });
      }
    });
  }
});

router.post("/register", async (req, res) => {
  const userData = await User.findOne({
    email: req.body.email,
  });
  if (userData) {
    return res.status(404).json({
      success: false,
      message: "User already exists",
      data: null,
    });
  } else {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      dob: req.body.dob,
      isAdmin: req.body.role === "admin" ? true : false,
    });

    User.addUser(newUser, (err, user) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong",
          data: null,
        });
      } else {
        const token = jwt.sign(
          {
            userid: newUser._id.toString(),
          },
          process.env.JWT_TOKEN
        );
        return res.status(200).json({
          success: true,
          message: "User added successfully",
          data: token,
        });
      }
    });
  }
});

module.exports = router;
