const mongoose = require('mongoose')
const Schema = mongoose.Schema

const petitionSchema = new Schema({
  subscribers: {
    type: [String],
    required: true
  },
  relatedBench: {
    type: Schema.Types.ObjectId,
    ref: 'Bench',
    required: true
  }
})

module.exports = mongoose.model('Petition', petitionSchema)