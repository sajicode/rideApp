const express = require('express');
const router = express.Router();
const DriversController = require('../controllers/drivers_controller');

router.route('/')
  .get(DriversController.getDrivers)
  .post(DriversController.create)

module.exports = router;

