const mongoose = require('mongoose');
const { isEmail } = require('validator');
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'you must choose a title for company']
  },
  website: {
    type: String,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: 'type of inputed email is not correct'
    }
  },
  companyPhoneNumber: {
    type: String,
    required: [true, 'company phone number is require'],
    length: [11, 'the length of phone number must be 11']
  },
  category: {
    type: String,
    required: [true, 'you must at least choose one category']
  },
  NumberOfPersonnel: {
    type: String,
    required: [true, 'you must fill this field']
  },
  companyLogo: {
    type: String,
    default: 'default company logo.jpg'
  }
});

module.exports = mongoose.model('company', companySchema);
