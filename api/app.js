"use strict";

// load modules
const express = require("express");
var cors = require("cors");
const morgan = require("morgan");
const Sequelize = require("sequelize");

var indexRouter = require("./routes/index");

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// create the Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", indexRouter);
// setup morgan which gives us http request logging
app.use(morgan("dev"));

// setup a friendly greeting for the root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the REST API project!",
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set("port", process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "fsjstd-restapi.db",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database successful!");
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
})();