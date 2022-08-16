const { body } = require("express-validator");

const Product_Route = (app, upload, ProductController, auth) => {
  app.post(
    "/uploadProduct",
    auth,
    upload.single("file1"),
    body("ProductLabel", "ProductLabel should be greater then 2").isLength({
      min: 2,
    }),
    body(
      "ProductDescription",
      "ProductDescription should be greater then 2"
    ).isLength({ min: 2 }),
    ProductController.ProductPost
  );

  app.get("/getProductData", ProductController.getProductDetails);

  app.get("/getProductByID/:id", ProductController.getProductByID);

  app.post(
    "/EditProduct/:id",
    auth,
    upload.single("file1"),
    body("ProductLabel", "ProductLabel should be greater then 2").isLength({
      min: 2,
    }),
    body(
      "ProductDescription",
      "ProductDescription should be greater then 2"
    ).isLength({ min: 2 }),
    ProductController.EditProduct
  );

  app.delete(
    "/deleteProductByID/:id",
    auth,
    ProductController.deleteProductByID
  );
};

module.exports = Product_Route;

