const mongoose = require('mongoose')
const Schema = mongoose.Schema

const geoLocationSchema = new Schema({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.Schema('GeoLocation', geoLocationSchema)