const Register = require("../model/register.model");
const bcrypt = require("bcryptjs");

exports.registration = async (req, res) => {
  bcrypt.hash(req.body.Password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        status: 0,
        error: "user not created" + " " + err,
      });
    } else {
      const register = new Register({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: hash,
        ProfileImage: req.file.filename,
      });
      Register.findOne({ Email: req.body.Email }).then((email) => {
        if (email) {
          res.json({
            success: false,
            message: "Failed! Email is already in use!",
            error_code: 409,
            data: {},
          });
        } else {
          register
            .save()
            .then((data) => {
              res.status(200).json({
                success: true,
                message:
                  "Congratulations, your account has been successfully created.",
                data: [data],
              });
            })
            .catch(() => {
              res.json({
                success: false,
                message: "Error",
                error_code: 500,
                data: {},
              });
            });
        }
      });
    }
  });
};
