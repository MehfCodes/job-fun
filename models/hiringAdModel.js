const mongoose = require('mongoose');

const hiringAdSchema = new mongoose.Schema({
  title: {
    type: String,

    required: [true, 'title is require , please enter it'],
    minlength: [5, 'title must be more than 5 characters']
  },
  // location: {
  //   type: {
  //     type: String,
  //     enum: ['Point'],
  //     required: [true, 'you must be specify company location']
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true
  //   }
  // },
  salary: {
    type: String,
    required: false
  },
  typeOfCooperation: {
    type: String,
    enum: {
      values: ['full time', 'half time'],
      message: 'select "full time" or "half time"'
    },
    required: [true, 'please enter type of cooperation , it is require']
  },
  minWorkExperience: {
    type: String,
    enum: {
      values: ['end of service', 'not matter'],
      message: 'select "end of service" or "not matter"'
    },
    required: [true, 'please enter "minimum work experient"']
  },
  aboutCompany: {
    type: String,
    minlength: [10, 'describtion must be more than 10 character'],
    required: [true, 'you must enter describtion about your company']
  },
  skillsRequiredDescribtion: {
    type: String,
    required: [
      true,
      '"skills Required Describtion" is require , please enter it'
    ]
  },
  minQualification: {
    type: String,
    required: [true, '"minimum qualification" is require , please enter it']
  },
  tag: {
    type: String,
    required: [true, 'you should specify at least one tag']
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company',
    required: true
  }
});

const hiringModel = mongoose.model('hiring advertise', hiringAdSchema);
module.exports = hiringModel;
