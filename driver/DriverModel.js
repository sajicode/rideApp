const mongoose = require('mongoose'),
      validator = require('validator'),
      Schema = mongoose.Schema;

const PointSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
  }
});

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },

  firstName: {
    type: String,
    required: true,
    minlength: 2
  },

  driving: {
    type: Boolean,
    default: false
  },

  geometry: {
    type: PointSchema,
    required: true
  },

  car: {
    type: String,
    required: true,
    minlength: 6
  },
  
});

var Driver = mongoose.model('driver', DriverSchema);

module.exports = {Driver};