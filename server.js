var express = require("express");
var bodyParser = require("body-parser");
var mongooseConfig = require("./src/mongoose");
// Routes
var tradesRouter = require("./src/routes/trades");

var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/trades", tradesRouter);

app.get("/", (req, res) => {
  res.status(200).send("<a href='http://localhost:8080/trades'>Trades API</a>");
});

app.listen(port, () => {
  mongooseConfig.run().catch(err => console.error(err.stack));
  console.log(`Server running on http://localhost:${port}!`);
});
