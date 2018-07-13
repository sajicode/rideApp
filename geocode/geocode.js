const axios = require('axios');

exports.geocode = function(address) {

  let encodedAddress = encodeURIComponent(address);

  let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

  axios.get(geocodeUrl)
    .then((response) => {
      if(response.data.status === "ZERO_RESULTS") {
        throw new Error("Unable to find address");
      }

      let latitude = response.data.results[0].geometry.location.lat;
      let longitude = response.data.results[0].geometry.location.lng;

        // res.send([latitude, longitude]);
      return [latitude, longitude];

    });
}
