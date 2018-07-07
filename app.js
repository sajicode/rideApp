require('./config/config');

const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      cors = require('cors'),
      api = require("./api"),
      {mongoose} = require('./db/mongoose');

app.use(bodyParser.json()); // parses any incoming requests(json) into 0bjects
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan("dev"));
app.use(cors());

app.use("/api", api)

// middleware
app.use(function(err, req, res, next) {
  res.status(500).json(err.message);
  next();
});

module.exports = {app};