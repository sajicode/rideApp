const express = require('express'),
      router = express.Router(),
      UserController = require('./UserController');

router.route('/register')
  .post(UserController.addUser)

router.route('/login')
  .post(UserController.loginUser)


module.exports = router;