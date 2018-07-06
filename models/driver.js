const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var DriverSchema = new Schema({
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
  }
});

var Driver = mongoose.model('driver', DriverSchema);

module.exports = {Driver};