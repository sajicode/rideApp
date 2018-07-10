const express = require('express'),
      api = express.Router(),
      driverRouter = require('./driver/DriverRoute'),
      driverPoint = require('./driver/DriverPointRoute'),
      userRouter = require('./user/UserRouter');

api.use("/drivers", driverRouter);
api.use("/driverspoint", driverPoint);
api.use("/users", userRouter);

module.exports = api;