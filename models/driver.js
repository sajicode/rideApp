const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const PointSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
});

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 8
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
  geometry: PointSchema
});

var Driver = mongoose.model('driver', DriverSchema);

module.exports = {Driver};