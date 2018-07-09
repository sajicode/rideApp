const { ObjectID } = require('mongodb'),
      { Driver } = require('../../driver/DriverModel');

const driverOneId = new ObjectID();
const driverTwoId = new ObjectID();

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
    // .then(() => Driver.ensureIndexes({'geometry.coordinates': '2dsphere'}))
    .then(function () {
      let driverOne = new Driver(drivers[0]).save();
      let driverTwo = new Driver(drivers[1]).save();

      return Promise.all([driverOne, driverTwo]);
    }).then(() => done());
};

module.exports = { drivers, populateDrivers }