const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PropertiesReader = require("properties-reader");
const commentController = require("./controller/comments.js");
const app = express();

const properties = PropertiesReader("./application.properties");
const PORT = properties.get("PORT");
const DB_URL = properties.get("DB_URL");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(cors());

app.use("/", express.static(path.join(__dirname, "..", "build")));

// controller
app.use("/api", commentController);

// DB and SERVER Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_URL, {})
  .then(() => {
    app.listen(PORT || 9001, () => {
      console.log("db connected and server started on port " + PORT || 9001);
    });
  })
  .catch((err) => console.log(err));
