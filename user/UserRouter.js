const express = require('express'),
      router = express.Router(),
      UserController = require('./UserController'),
      {authenticate} = require('../auth/Auth');

router.route('/')
  .get(UserController.fetchUsers);

router.route('/register')
  .post(UserController.addUser);

router.route('/login')
  .post(UserController.loginUser);

router.route('/findcab')
  .get(authenticate, UserController.findTaxi);

// this route should be placed last for ObjectID error reasons
router.route('/:id')
  .get(UserController.getUser);


module.exports = router;