const express = require('express');
const router = express.Router();
const DriversController = require('../driver/DriversController');

router.route('/')
  .get(DriversController.point)

module.exports = router;
