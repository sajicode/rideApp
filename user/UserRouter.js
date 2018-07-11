const express = require('express'),
      router = express.Router(),
      UserController = require('./UserController'),
      {authenticate} = require('../auth/Auth');

router.route('/register')
  .post(UserController.addUser)

router.route('/login')
  .post(UserController.loginUser)

router.route('/findcab')
  .get(authenticate, UserController.findTaxi);


module.exports = router;