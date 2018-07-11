const { Driver } = require('./DriverModel');

let locateDriver = function(lng, lat) {

  Driver.aggregate([{
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
};

module.exports = {locateDriver};