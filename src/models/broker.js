var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BrokerSchema = new Schema({
  code: String,
  name: String,
  feesApplied: {
    obj: {
      trade: Number,
      settlement: Number,
      brokerage: Number,
      custody: Number
    }
  }
});

module.exports = mongoose.model("broker", BrokerSchema);
