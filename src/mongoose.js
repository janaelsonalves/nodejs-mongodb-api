const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://localhost/assets";

exports.run = async function() {
  mongoose.set("useCreateIndex", true);
  mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
      console.log("Sucessful connection!");
    })
    .catch(err => {
      console.log("Failed connection! Error: ", err);
    });
};
