const express = require('express'),
      api = express.Router(),
      driverRouter = require('./driver/DriverRoute'),
      userRouter = require('./user/UserRouter');

api.use("/drivers", driverRouter);
api.use("/users", userRouter);

module.exports = api;