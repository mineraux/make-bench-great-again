const mongoose = require('mongoose')
const Schema = mongoose.Schema

const petitionSchema = new Schema({
  subscribers: {
    type: [String]
  },
  relatedBench: {
    type: Schema.Types.ObjectId,
    ref: 'Bench'
  }
})

module.exports = mongoose.model('Petition', petitionSchema)