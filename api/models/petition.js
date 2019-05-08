const mongoose = require('mongoose')
const Schema = mongoose.Schema

const petitionSchema = new Schema({
  subscribers: {
    type: [String]
  },
  relatedInstallation: {
    type: Schema.Types.ObjectId,
    ref: 'Installation'
  }
})

module.exports = mongoose.model('Petition', petitionSchema)