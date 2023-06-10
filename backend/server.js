const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

global.__basedir = __dirname; // global variable created

const databaseConnection = require("./database");

var corsOptions = {
  origin: "http://localhost:4200" // will use of environment file instead of this direct URL
};

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors(corsOptions));
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));

const initRoutes = require("./src/routes");
initRoutes(app);


let port = 8080; // this also we can put in an environment file
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});