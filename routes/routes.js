const express = require('express');
const router = express.Router();
const DriversController = require('../controllers/drivers_controller');

router.route('/')
  .get(DriversController.fetchDrivers)
  .post(DriversController.create)

router.route('/:id')
  .get(DriversController.getDriver)
  .put(DriversController.editDriver)

module.exports = router;

