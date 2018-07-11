const _ = require('lodash'),
      {ObjectID} = require('mongodb'),
      {Driver} = require('../driver/DriverModel'),
      {User} = require('./UserModel'),
      {authenticate} = require('../auth/Auth');

exports.addUser = function(req, res) {
  let data = req.body;
  let user = new User(data);

  user.save()
    .then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((err) => {
      res.status(400).send(err);
    });
};

exports.loginUser = function(req, res) {

  User.findByCredentials(req.body.email, req.body.password)
    .then((user) => {
      return user.generateAuthToken()
        .then((token) => {
          res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
      res.status(400).send("Invalid email and/or password");
    });
};
