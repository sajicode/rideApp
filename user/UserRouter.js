const express = require('express'),
      router = express.Router(),
      UserController = require('./UserController');

router.route('/register')
  .post(UserController.addUser)


module.exports = router