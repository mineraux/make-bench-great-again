const Installation = require('../../models/installation')
const Petition = require('../../models/petition')

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
  installationList: async () => {
    try {
      const installationList = await Installation.find()
      return installationList.map(installation => {
        return {
          ...installation._doc,
          _id: installation.id,
          slug: installation.slug,
          name: installation.name,
          description: installation.description,
          lockedDescription: installation.lockedDescription,
          geolocation: installation.geolocation,
          hashTags: installation.hashTags,
          testimony: installation.testimony,
          relatedPetition: installation.relatedPetition
        }
      })
    } catch (err) {
      throw err
    }
  },
  singleInstallation: async args => {
    try {
      const installation = await Installation.findById(args.installationId)
      return installation
    } catch (err) {
      throw err
    }
  },
  createInstallation: async args => {
    const installation = new Installation({
      slug: args.installationInput.slug,
      name: args.installationInput.name,
      description: args.installationInput.description,
      lockedDescription: args.installationInput.lockedDescription,
      geolocation: args.installationInput.geolocation,
      hashTags: args.installationInput.hashTags,
      testimony: args.installationInput.testimony,
      relatedPetition: args.installationInput.relatedPetition ? args.installationInput.relatedPetition : null
    })

    let createdInstallation

    try {
      const result = await installation.save()
      createdInstallation = {
        ...result._doc,
        _id: result._doc._id.toString(),
        relatedPetition: args.installationInput.relatedPetition ? petition.bind(this, result._doc.relatedPetition) : null
      }
      let relatedPetition = await Petition.findById(args.installationInput.relatedPetition)

      if (!relatedPetition) {
        relatedPetition = null
      } else {
        relatedPetition.relatedInstallation = installation
        await relatedPetition.save()
      }

      return createdInstallation

    } catch (err) {
      throw err
    }
  },
  deleteInstallation: async args => {
    try {
      const installation = await Installation.findById(args.installationId)
      await Installation.deleteOne({
        _id: args.installationId
      })
      return installation
    } catch (err) {
      throw err
    }
  },
  updateInstallation: async args => {
    var fieldsToUpdate = {};

    if (args.updateInstallationInput.slug) fieldsToUpdate.slug = args.updateInstallationInput.slug
    if (args.updateInstallationInput.name) fieldsToUpdate.name = args.updateInstallationInput.name
    if (args.updateInstallationInput.description) fieldsToUpdate.description = args.updateInstallationInput.description
    if (args.updateInstallationInput.lockedDescription) fieldsToUpdate.lockedDescription = args.updateInstallationInput.lockedDescription
    if (args.updateInstallationInput.geolocation) fieldsToUpdate.geolocation = args.updateInstallationInput.geolocation
    if (args.updateInstallationInput.testimony) fieldsToUpdate.testimony = args.updateInstallationInput.testimony
    if (args.updateInstallationInput.hashTags) fieldsToUpdate.hashTags = args.updateInstallationInput.hashTags
    if (args.updateInstallationInput.relatedPetition) fieldsToUpdate.relatedPetition = args.updateInstallationInput.relatedPetition

    try {
      if (fieldsToUpdate.relatedPetition) {
        const installation = await Installation.findById(args.updateInstallationInput._id)
        const relatedPetition = await Petition.findById(installation.relatedPetition)
        relatedPetition.relatedInstallation = null
        relatedPetition.save()
      }

      const updatedInstallation = await Installation.findOneAndUpdate(
        {"_id" : args.updateInstallationInput._id},
        { $set: fieldsToUpdate },
        {new: true}
      )

      if (args.updateInstallationInput.relatedPetition) {
        let relatedPetition = await Petition.findById(args.updateInstallationInput.relatedPetition)
        relatedPetition.relatedInstallation = updatedInstallation._doc._id
        relatedPetition.save()
      }

      return updatedInstallation

    } catch (err) {
      throw err
    }
  }
}