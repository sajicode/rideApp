const express = require('express'),
      api = express.Router(),
      driverRouter = require('./driver/DriverRoute'),
      driverPoint = require('./driver/DriverPointRoute');

api.use("/drivers", driverRouter);
api.use("/driverspoint", driverPoint);

module.exports = api;