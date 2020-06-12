require("dotenv").config();
const express = require("express");
const bodyParse = require("body-parser");
const app = express();

const {env} = require('./config/globals') 
const { createConnection } = require("./db");
const initRestRoutes = require("./api/index");
// cors middleware
const corsMiddleware = require('./api/middlewares/cors')
// error handler middleware
const errorHandler = require("./api/middlewares/error-handler");

// init connect  to mongodb atlas
createConnection();
app.use(corsMiddleware);
app.use(express.static("public"));
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

// init routes
initRestRoutes(app);
app.use(errorHandler);

const listener = app.listen(env.PORT, function() {
  console.log("Listening on port:" + listener.address().port);
});
