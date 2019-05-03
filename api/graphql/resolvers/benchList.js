const Bench = require('../../models/bench')
const Petition = require('../../models/petition')

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
  benchList: async () => {
    try {
      const benchList = await Bench.find()
      return benchList.map(bench => {
        return {
          ...bench._doc,
          _id: bench.id,
          name: bench.name,
          description: bench.description,
          lockedDescription: bench.lockedDescription,
          geolocation: bench.geolocation,
          hashTags: bench.hashTags
        }
      })
    } catch (err) {
      throw err
    }
  },
  singleBench: async args => {
    try {
      const bench = await Bench.findById(args.benchId)
      return bench
    } catch (err) {
      throw err
    }
  },
  createBench: async args => {
    const bench = new Bench({
      name: args.benchInput.name,
      description: args.benchInput.description,
      lockedDescription: args.benchInput.lockedDescription,
      geolocation: args.benchInput.geolocation,
      hashTags: args.benchInput.hashTags,
      relatedPetition: args.benchInput.relatedPetition ? args.benchInput.relatedPetition : null
    })

    let createdBench

    try {
      const result = await bench.save()
      createdBench = {
        ...result._doc,
        _id: result._doc._id.toString(),
        relatedPetition: args.benchInput.relatedPetition ? petition.bind(this, result._doc.relatedPetition) : null
      }
      let relatedPetition = await Petition.findById(args.benchInput.relatedPetition)

      if (!relatedPetition) {
        relatedPetition = null
      } else {
        relatedPetition.relatedBench = bench
        await relatedPetition.save()
      }

      return createdBench

    } catch (err) {
      throw err
    }
  },
  deleteBench: async args => {
    try {
      const bench = await Bench.findById(args.benchId)
      await Bench.deleteOne({
        _id: args.benchId
      })
      return bench
    } catch (err) {
      throw err
    }
  },
  updateBench: async args => {
    var fieldsToUpdate = {};

    if (args.updateBenchInput.name) fieldsToUpdate.name = args.updateBenchInput.name
    if (args.updateBenchInput.description) fieldsToUpdate.description = args.updateBenchInput.description
    if (args.updateBenchInput.lockedDescription) fieldsToUpdate.lockedDescription = args.updateBenchInput.lockedDescription
    if (args.updateBenchInput.geolocation) fieldsToUpdate.geolocation = args.updateBenchInput.geolocation
    if (args.updateBenchInput.hashTags) fieldsToUpdate.hashTags = args.updateBenchInput.hashTags
    if (args.updateBenchInput.relatedPetition) fieldsToUpdate.relatedPetition = args.updateBenchInput.relatedPetition

    try {
      const bench = await Bench.findById(args.updateBenchInput._id)
      const relatedPetition = await Petition.findById(bench.relatedPetition)
      relatedPetition.relatedBench = null
      relatedPetition.save()

      const updatedBench = await Bench.findOneAndUpdate(
        {"_id" : args.updateBenchInput._id},
        { $set: fieldsToUpdate },
        {new: true}
      )

      if (args.updateBenchInput.relatedPetition) {
        let relatedPetition = await Petition.findById(args.updateBenchInput.relatedPetition)
        relatedPetition.relatedBench = updatedBench._doc._id
        relatedPetition.save()
      }

      return updatedBench

    } catch (err) {
      throw err
    }
  }
}