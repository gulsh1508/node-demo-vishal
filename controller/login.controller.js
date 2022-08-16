const Register = require("../model/register.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');

exports.login = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Register.find({ Email: req.body.Email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          success: false,
          message: "Invalid email",
          error_code: 1308,
          data: {},
        });
      }
      bcrypt.compare(req.body.Password, user[0].Password, (err, result) => {
        if (!result) {
          return res.status(401).json({
            success: false,
            message: "Invalid password",
            error_code: 1308,
            data: {},
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              Email: user[0].Email,
              Password: user[0].Password,
            },
            "qwertyuiop",
            {
              expiresIn: "24h",
            }
          );
          res.json({
            success: true,
            message: "Login Successfully",
            data: user,
            token: token,
          });
        }
      });
    })
    .catch(() => {
      res.status(500).json({
        success: false,
        messsage: "Error",
        data: {},
        error_code: 1308,
      });
    });
};