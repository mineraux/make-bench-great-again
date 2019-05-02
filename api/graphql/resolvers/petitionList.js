const Petition = require('../../models/petition')
const Bench = require('../../models/bench')


const petition = async petitionId => {
  try {
    const petition = await Petition.findById(petitionId)
    return {
      ...petition._doc,
      _id: petition.id,
      relatedBench: bench.bind(this, peition.relatedBench)
    }
  } catch (err) {
    throw err
  }
}

const bench = async benchId => {
  try {
    const bench = await Bench.findById(benchId)
    return {
      ...bench._doc,
      _id: bench.id,
      relatedPetition: petition.bind(this, petition._doc.relatedPetition)
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
      // const createdPetition = await petition.save()
      // return createdPetition
      const 
      createdPetition = {
        ...result._doc,
        relatedBench: bench.bind(this, args.petitionInput.relatedBench)
      }

      console.log(args.petitionInput.relatedBench)
      const bench = await Bench.findById(args.petitionInput.relatedBench)

      bench.relatedBench.push(petition)
      console.log(createdPetition)
      console.log(bench)
      await bench.save()

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