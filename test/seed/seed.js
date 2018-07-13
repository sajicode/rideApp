const { ObjectID } = require('mongodb'),
      { Driver } = require('../../driver/DriverModel'),
      { User } = require('../../user/UserModel'),
      jwt = require('jsonwebtoken');

const driverOneId = new ObjectID(),
      driverTwoId = new ObjectID();

const drivers = [{
  _id: driverOneId,
  email: 'taxidriver@ride.com',
  firstName: "kanye",
  car: "Toyota Camry",
  geometry: {
        type: 'Point',
        coordinates: [3.510454, 6.619413]
      }
}, {
  _id: driverTwoId,
  email: 'cabdriver@ride.com',
  firstName: "shawn",
  car: "Ford Explorer",
  geometry: {
        type: 'Point',
        coordinates: [3.351486, 6.601838]
      }
}];

const populateDrivers = function (done) {
  Driver.remove({})
    .then(function () {
      let driverOne = new Driver(drivers[0]).save();
          driverTwo = new Driver(drivers[1]).save();

      return Promise.all([driverOne, driverTwo]);
    }).then(() => done());
};

const userOneId = new ObjectID(),
      userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: "kari@dev.com",
  firstName: "Kari",
  password: "katherine",
  location: "West Ham",
  tokens: [{
    access: 'auth',
    token: jwt.sign({
      _id: userOneId,
      access: 'auth'
    }, process.env.SECRET).toString()
  }]
}, {
  _id: userTwoId,
  email: "wendy@dev.com",
  firstName: "Wendy",
  password: "ketowendy",
  location: "Ontario",
  tokens: [{
    access: 'auth',
    token: jwt.sign({
      _id: userTwoId,
      access: 'auth'
    }, process.env.SECRET).toString()
  }]
}];

const populateUsers = function(done) {
  User.remove({})
    .then(function() {
      let userOne = new User(users[0]).save(),
          userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = { drivers, populateDrivers, users, populateUsers };