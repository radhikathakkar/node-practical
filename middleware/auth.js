const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.headers["authorization"];

  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.lenth);
    }
    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(422).json({
          success: false,
          message: err,
          data: null,
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "Auth token is not supplied",
      data: null,
    });
  }
};

module.exports = auth;