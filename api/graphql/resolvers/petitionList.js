const Petition = require('../../models/petition')

module.exports = {
  petitionList: async () => {
    try {
      const petitionList = await Petition.find()
      return petitionList.map(petition => {
        return {
          ...petition._doc,
          _id: petition.id,
          title: petition.title,
          description: petition.description
        }
      })
    } catch (err) {
      throw err
    }
  },
  createPetition: async args => {
    const petition = new Petition({
      title: args.petitionInput.title,
      description: args.petitionInput.description
    })

    try {
      const createdPetition = await petition.save()
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