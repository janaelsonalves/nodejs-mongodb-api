const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://localhost/assets";

exports.run = async function() {
  mongoose.set("useCreateIndex", true);
  mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
      console.log("Sucessful connection with Mongoose!");
    })
    .catch(err => {
      console.log(
        "Ocurred an error to try connect with Mongoose! \nError: ",
        err
      );
    });
};
