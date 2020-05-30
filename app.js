require("dotenv").config();
const express = require("express");
const bodyParse = require("body-parser");
const app = express();

const {env} = require('./config/globals') 

const initRestRoutes = require("./api/index");
const { createConnection } = require("./db");
const cors = require("cors");
// error handler middleware
const errorHandler = require("./api/middlewares/error-handler");
// init connect  to mongodb atlas
createConnection();
// template engine
const corsOptions = {
  origin: "https://gtf7d.csb.appsss/"
};
// middleware
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

// init routes
initRestRoutes(app);
app.use(errorHandler);

const listener = app.listen(env.PORT, function() {
  console.log("Listening on port:" + listener.address().port);
});
