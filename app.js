const express = require("express");
const bodyParser = require("body-parser");
const connectionDB = require("./configuration/db");
const cors = require("cors");
const path = require("path");
connectionDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: true }));
//Body-parser is the Node. js body parsing middleware. It is responsible for parsing the incoming request bodies in a middleware before you handle it.

app.use(bodyParser.json());
//bodyParser. json returns middleware that only parses JSON.

app.use(express.json());
//This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparser

app.use(cors());
//CORS stands for Cross-Origin Resource Sharing . It allows us to relax the security applied to an API.

app.use("/uploads", express.static(__dirname + "/uploads/"));

app.use(express.static(path.join(__dirname + "/public")));

require("./routes/route")(app);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
