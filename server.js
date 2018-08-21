var express = require('express');
var httpProxy = require('http-proxy')
var request = require('request');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

// Routes
var bearsRouter = require('./routes/bears');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Model imports
var Bear = require('./models/bear');
var User = require('./models/user');

// App express
var app = express();

// Router instance
var router = express.Router();

/* app.use('/api/bears', bearsRouter);
app.use('/api', indexRouter);
app.use('/api/users', usersRouter); */



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

const MONGODB_URI = "mongodb://ionic4:ionic4@ds125912.mlab.com:25912/ionic-hotels";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });
})

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/users', (req, res) => {
    User.find((err, users) => {
        if (err) {
            console.log(err);
        }
        res.json(users);
    });
})

router.post('/users', (req, res) => {

    var user = new User();      // create a new instance of the User model

    user.name = req.body.name;  // set the users name (comes from the request)        
    user.email = req.body.email;
    user.phone = req.body.phone;

    // save the bear and check for errors
    user.save(function (err) {
        if (err)
            res.send(err);

        res.json({ message: 'User created!' });
    });
})

// get all the bears (accessed at GET http://localhost:8080/api/bears)
router.get('/bears', (req, res) => {
    Bear.find((err, bears) => {
        if (err) {
            res.send(err);
        }
        res.json(bears);
    })
})

// create a bear (accessed at POST http://localhost:8080/api/bears)
router.post('/bears', (req, res) => {
    var bear = new Bear();      // create a new instance of the Bear model
    bear.name = req.body.name;  // set the bears name (comes from the request)

    // save the bear and check for errors
    bear.save(function (err) {
        if (err)
            res.send(err);

        res.json({ message: 'Bear created!' });
    });
})

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
router.get('/bears/:bear_id', (req, res) => {
    Bear.findById(req.params.bear_id, function (err, bear) {
        if (err)
            res.send(err);
        res.json(bear);
    });
});

// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
router.put('/bears/:bear_id', (req, res) => {

    // use our bear model to find the bear we want
    Bear.findById(req.params.bear_id, function (err, bear) {

        if (err) {
            res.send(err);
        }

        console.log(bear.name);

        bear.name = req.body.name;  // update the bears info

        // save the bear
        bear.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear updated!' });
        });

    })
})

// delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
router.delete('/bears/:bear_id', (req, res) => {
    Bear.remove({
        _id: req.params.bear_id
    }, function (err, bear) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});

// Proxy

var apiUrl = "https://api.cartolafc.globo.com/"

var apiProxy = httpProxy.createProxy();

var proxyOptions = {
    target: apiUrl,
    changeOrigin: true,
};

app.use('/cartola', (req, res) => {
    apiProxy.web(req, res, proxyOptions);
})

/* 
// MongoDB
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var mongodb = require('mongodb');
 
const MONGODB_URI = "mongodb://ionic4:ionic4@ds125912.mlab.com:25912/ionic-hotels";
//var db = mongodb.connect(MONGODB_URI, {useNewUrlParser: true});
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
 
mongoose.Promise = global.Promise;
 
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
 */
var port = process.env.PORT || 8080;        // set our port

var server = app.listen(port, function () {
    console.log(`App listening on port ${server.address().port}!`);
});