const Petition = require('../../models/petition')
const Bench = require('../../models/bench')

const bench = async benchId => {
  try {
    const bench = await Bench.findById(benchId)
    return {
      ...bench._doc,
      _id: bench.id,
      relatedPetition: petition.bind(this, bench.relatedPetition)
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
      relatedBench: bench.bind(this, petition.relatedBench)
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
          relatedBench: petition.relatedBench
        }
      })
    } catch (err) {
      throw err
    }
  },
  createPetition: async args => {
    const petition = new Petition({
      subscribers: args.petitionInput.subscribers,
      relatedBench: args.petitionInput.relatedBench
    })

    let createdPetition

    try {
      const result = await petition.save()
      createdPetition = {
        ...result._doc,
        _id: result._doc._id.toString(),
        relatedBench: bench.bind(this, result._doc.relatedPetition)
      }
      let relatedBench = await Bench.findById(args.petitionInput.relatedBench)

      relatedBench.relatedPetition = petition
      await relatedBench.save()
      
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