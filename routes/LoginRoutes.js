const { body } = require("express-validator");

const Login_Route = (app, LoginController) => {
  app.post(
    "/login",
    body("Email", "Please Enter valid Email").isEmail(),
    body("Password", "Password should be greater then 2").isLength({ min: 2 }),
    LoginController.login
  );
};

module.exports = Login_Route;
