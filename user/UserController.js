const _ = require('lodash'),
      {ObjectID} = require('mongodb'),
      {Driver} = require('../driver/DriverModel'),
      {User} = require('./UserModel'),
      {authenticate} = require('../auth/Auth'),
      axios = require('axios');
      // locateDriver = require('../driver/DriverLocation');
      // {geocode} = require('../geocode/geocode');

exports.addUser = function(req, res) {
  let data = req.body;
  let user = new User(data);

  user.save()
    .then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((err) => {
      res.status(400).send(err);
    });
};

exports.loginUser = function(req, res) {

  User.findByCredentials(req.body.email, req.body.password)
    .then((user) => {
      return user.generateAuthToken()
        .then((token) => {
          res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
      res.status(400).send("Invalid email and/or password");
    });
};

exports.findTaxi = function(req, res) {
  let token = req.header('x-auth'),
      latitude,
      longitude;

  User.findByToken(token)
    .then((user) => {
      if(!user) {
        return Promise.reject();
      }

      location = user.location;

      let encodedAddress = encodeURIComponent(location);

      let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

      axios.get(geocodeUrl)
        .then((response) => {
          if (response.data.status === "ZERO_RESULTS") {
            throw new Error("Unable to find address");
          }

          latitude = response.data.results[0].geometry.location.lat;
          longitude = response.data.results[0].geometry.location.lng;

          return [longitude, latitude];
          // res.send([longitude, latitude]);

        })
        .then(function(getDriver) {
          // res.send([longitude, latitude]);
          let coordinates = [longitude, latitude];
          let lng = coordinates[0],
              lat = coordinates[1];

          Driver.aggregate([
            {
              $geoNear: {
                near: {
                  type: "Point",
                  coordinates: [parseFloat(lng), parseFloat(lat)]
                },
                distanceField: "dist.calculated",
                maxDistance: 200000,
                spherical: true
              }
            }
          ])
            .then(drivers => {

              if(drivers.length == 0) {
                res.status(404).send("No available drivers within your location")
              }

              for(let driver of drivers) {
                if(!driver.driving) {
                  res.status(200).send(driver);
                }
              }
            }).catch(e => res.send(e));
        })
    })
};

exports.fetchUsers = (req, res) => {
  User.find({})
    .then((err, users) => {
      if(err) {
        res.status(400).send(err)
      }

      res.status(200).send(users);
    })
};

exports.getUser = (req, res) => {
  let userId = req.params.id;

  User.findById(userId)
    .then((err, user) => {
      if(err) {
        res.status(400).send(err)
      }
      
      res.status(200).send(user);
    })
};
