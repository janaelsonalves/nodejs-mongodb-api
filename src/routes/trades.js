var express = require("express");
var router = express.Router();

var tradeController = require("../controllers/trade");

router.post("/", (req, res) => {
  tradeController.createTrade(req, res);
});

router.get("/", (req, res) => {
  tradeController.getTrades(req, res);
});

router.get("/:id", (req, res) => {
  tradeController.getOneTrade(req, res);
});

router.put("/:id", (req, res) => {
  tradeController.updateTrade(req, res);
});

router.delete("/:id", (req, res) => {
  tradeController.removeTrade(req, res);
});

module.exports = router;
