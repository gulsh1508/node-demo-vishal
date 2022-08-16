const Register_Route = (app, upload, RegisterController) => {
  app.post(
    "/employees/registration",
    upload.single("file2"),
    RegisterController.registration
  );
};

module.exports = Register_Route;
