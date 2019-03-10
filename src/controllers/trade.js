var Trade = require("../models/trade");

exports.createTrade = async (req, res) => {
  let data = req.body;
  Trade.create(data, (err, trade) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(201).json(trade);
  });
};

exports.getTrades = async (req, res) => {
  Trade.find((err, trades) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).json(trades);
  });
};

exports.getOneTrade = async (req, res) => {
  Trade.findById(req.params.id, function(err, trade) {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).json(trade);
  });
};

exports.removeTrade = async (req, res) => {
  let id = req.params.id;
  Trade.deleteOne({ _id: id }, err => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).json({ deleted: true });
  });
};

exports.updateTrade = async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  Trade.updateOne({ _id: id }, data, (err, trade) => {
    if (err) {
      res.status(200).send(err);
    }
    res.status(200).json(trade);
  });
};
