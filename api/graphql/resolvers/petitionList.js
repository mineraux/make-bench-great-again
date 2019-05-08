const Petition = require('../../models/petition')
const Installation = require('../../models/installation')

const installation = async installationId => {
  try {
    const installation = await Installation.findById(installationId)
    return {
      ...installation._doc,
      _id: installation.id,
      relatedPetition: petition.bind(this, installation.relatedPetition)
    }
  } catch (err) {
    throw err
  }
}

const petition = async petitionId => {
  try {
    const petition = await Petition.findById(petitionId)
    return {
      ...petition._doc,
      _id: petition.id,
      relatedInstallation: installation.bind(this, petition.relatedInstallation)
    }
  } catch (err) {
    throw err
  }
}

module.exports = {

  petitionList: async () => {
    try {
      const petitionList = await Petition.find()
      return petitionList.map(petition => {
        return {
          ...petition._doc,
          _id: petition.id,
          subscribers: petition.subscribers,
          relatedInstallation: petition.relatedInstallation
        }
      })
    } catch (err) {
      throw err
    }
  },
  createPetition: async args => {
    const petition = new Petition({
      subscribers: args.petitionInput.subscribers,
      relatedInstallation: args.petitionInput.relatedInstallation ? args.petitionInput.relatedInstallation : null
    })

    let createdPetition

    try {
      const result = await petition.save()
      createdPetition = {
        ...result._doc,
        _id: result._doc._id.toString(),
        relatedInstallation: args.petitionInput.relatedInstallation ? installation.bind(this, result._doc.relatedPetition) : null
      }
      let relatedInstallation = await Installation.findById(args.petitionInput.relatedInstallation)

      if (!relatedInstallation) {
        relatedInstallation = null
      } else {
        relatedInstallation.relatedPetition = petition
        await relatedInstallation.save()
      }

      return createdPetition
    } catch (err) {
      throw err
    }
  },
  deletePetition: async args => {
    try {
      const petition = await Petition.findById(args.petitionId)
      await Petition.deleteOne({
        _id: args.petitionId
      })
      return petition
    } catch (err) {
      throw err
    }
  }
}