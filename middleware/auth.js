const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth");
  if (!token) {
    res.status(401).json({ mes: "no token authorized" });
  } else {
    try {
      const decode = jwt.verify(token, "qwertyuiop");
      req.user = decode;
      next();
    } catch (err) {
      res.status(402).json({ mes: "token not valid authorized" });
    }
  }
};
