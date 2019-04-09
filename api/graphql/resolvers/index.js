const benchListResolver = require('./benchList')
const petitionListResolver = require('./petitionList')

const RootResolver = {
  ...benchListResolver,
  ...petitionListResolver
}

module.exports = RootResolver