const express = require('express'),
      api = express.Router(),
      driverRouter = require('./routes/routes');

api.use("/drivers", driverRouter);

module.exports = api;