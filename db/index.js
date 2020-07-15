const mongoose = require("mongoose");
const MONGODB_SERVER_URI = 'mongodb://localhost:27017/'
const DATABASE_NAME = 'instagram'
const createConnection = () =>
  mongoose
    .connect(MONGODB_SERVER_URI + DATABASE_NAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(res => {
      console.log("mongodb connected");
      return res;
    })
    .catch(err => {
      console.log("mongodb connect failed", err);
      return err;
    });

module.exports = { createConnection };
