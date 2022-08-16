const { upload } = require("../middleware/fileUpload");

const LoginController = require("../controller/login.controller");
const Login_Route = require("./LoginRoutes");

const ProductController = require("../controller/Product.controller");
const Product_Route = require("./ProductRoutes");

const RegisterController = require("../controller/register.controller");
const Register_Route = require("../routes/RegisterRoute");

const auth = require("../middleware/auth");

module.exports = (app) => {
  Login_Route(app, LoginController, auth);
  Register_Route(app, upload, RegisterController);
  Product_Route(app, upload, ProductController, auth);
};
