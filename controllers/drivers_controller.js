const {Driver} = require('../models/driver');

exports.greeting = function(req, res) {
    res.send({ hi: 'there' });
};

exports.create = function(req, res) {
  let data = req.body;
  let driver = new Driver(data);

  driver.save()
    .then(doc => {
      res.send(doc);
    }, (err) => {
      res.status(400).send(err);
    });
};

exports.getDrivers = function(req, res) {
  Driver.find({})
    .then((drivers) => {
      res.send({drivers})
    }, (e) => {
      res.status(400).send(e);
    });
};
