const express = require('express');
const router = express.Router();
const DriversController = require('../controllers/drivers_controller');

router.route('/')
  .get(DriversController.getDrivers)
  .post(DriversController.create)

router.route('/:id')
  .put(DriversController.editDriver)

module.exports = router;

