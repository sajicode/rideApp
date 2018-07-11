const yargs = require('yargs'),
      argv = yargs.argv,
      axios = require('axios');

let geocode = function(address) {

  let encodedAddress = encodeURIComponent(address);

  let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

  axios.get(geocodeUrl)
    .then((response) => {
      if(response.data.status === "ZERO_RESULTS") {
        throw new Error("Unable to find address");
      }

      latitude = response.data.results[0].geometry.location.lat,
      longitude = response.data.results[0].geometry.location.lng;

      return [latitude, longitude];

    });
}

module.exports = {geocode};
