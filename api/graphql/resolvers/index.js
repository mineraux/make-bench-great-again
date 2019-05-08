const installationListResolver = require('./installationList')
const petitionListResolver = require('./petitionList')

const RootResolver = {
  ...installationListResolver,
  ...petitionListResolver
}

module.exports = RootResolver