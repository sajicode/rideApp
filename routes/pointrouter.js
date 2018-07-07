const express = require('express');
const router = express.Router();
const DriversController = require('../controllers/drivers_controller');

router.route('/')
  .get(DriversController.point)

module.exports = router;
