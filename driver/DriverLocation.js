const { Driver } = require('./DriverModel');

module.exports.locateDriver = (lng, lat) => {

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
  }]);
};
