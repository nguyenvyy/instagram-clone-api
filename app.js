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
const whitelist = {
  origin: ['https://instagram-clone-d083b.web.app', 'https://instagram-clone-d083b.firebaseapp.com']
};
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      console.log(origin)
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
// app.use(cors());
app.use(express.static("public"));
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

// init routes
initRestRoutes(app);
app.use(errorHandler);

const listener = app.listen(env.PORT, function() {
  console.log("Listening on port:" + listener.address().port);
});
