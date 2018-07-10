const express = require('express');
const router = express.Router();
const DriversController = require('./DriversController');

router.route('/')
  .get(DriversController.fetchDrivers)
  .post(DriversController.create)

router.route('/:id')
  .get(DriversController.getDriver)
  .put(DriversController.editDriver)
  .delete(DriversController.deleteDriver)

module.exports = router;

