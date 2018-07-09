const { ObjectID } = require('mongodb'),
      { Driver } = require('../../driver/DriverModel');

const driverOneId = new ObjectID();
const driverTwoId = new ObjectID();

const drivers = [{
  _id: driverOneId,
  email: 'taxidriver@ride.com',
  firstName: "kanye"
}, {
  _id: driverTwoId,
  email: 'cabdriver@ride.com',
  firstName: "shawn"
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