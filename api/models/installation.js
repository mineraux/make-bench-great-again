const mongoose = require('mongoose')
const Schema = mongoose.Schema

const installationSchema = new Schema({   
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  lockedDescription: {
    type: String,
    required: true
  },
  geolocation: {
    type: {
      latitude: Number,
      longitude: Number
    },
    required: true
  },
  hashTags: {
    type: [String],
    required: true
  },
  testimony: {
    type: String,
  },
  relatedPetition: {
    type: Schema.Types.ObjectId,
    ref: 'Petition'
  }
})

module.exports = mongoose.model('Installation', installationSchema)