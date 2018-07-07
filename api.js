const express = require('express'),
      api = express.Router(),
      driverRouter = require('./routes/routes'),
      driverPoint = require('./routes/pointrouter')

api.use("/drivers", driverRouter);
api.use("/driverspoint", driverPoint);

module.exports = api;