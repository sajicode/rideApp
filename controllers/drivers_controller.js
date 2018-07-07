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

exports.getDriver = function(req, res) {
  const driverId = req.params.id;

  Driver.findById({_id: driverId})
    .then((driver) => {
      if(!driver) {
        res.status(404).send();
      }

      res.status(200).send(driver);
    }).catch(e => {
      res.status(400).send();
    });
};

exports.fetchDrivers = function(req, res) {
  Driver.find({})
    .then((drivers) => {
      res.send({drivers})
    }, (e) => {
      res.status(400).send(e);
    });
};

exports.editDriver = function(req, res) {
  const driverId = req.params.id;
  let data = req.body;

  Driver.findByIdAndUpdate({ _id: driverId}, {$set: data}, {new: true})
    .then((driver) => {
      if(!driver) {
        return res.status(404).send();
      }

      res.status(200).send({driver});
    }).catch((e) => {
      res.status(400).send(e);
    });
};

