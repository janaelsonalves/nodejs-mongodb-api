var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TradeSchema = new Schema({
  broker: { type: String },
  createdAt: { type: Date, default: Date.now() },
  type: { type: String },
  market: { type: String },
  stock: { type: String },
  quantity: { type: Number },
  price: { type: Number }
});

module.exports = mongoose.model("Trade", TradeSchema);
