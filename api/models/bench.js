const mongoose = require('mongoose')
const Schema = mongoose.Schema

const benchSchema = new Schema({
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
  }
})

module.exports = mongoose.model('Bench', benchSchema)