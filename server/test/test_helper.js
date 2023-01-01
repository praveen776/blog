const mongoose = require("mongoose");
const PropertiesReader = require("properties-reader");

const properties = PropertiesReader("./application.properties");

const DB_URL = properties.get("DB_URL");
// tells mongoose to use ES6 implementation of promises
mongoose.Promise = global.Promise;

mongoose.connect(DB_URL);

mongoose.connection
  .once("open", () => console.log("Connected!"))
  .on("error", (error) => {
    console.warn("Error : ", error);
  });
