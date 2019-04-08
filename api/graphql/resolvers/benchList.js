const Bench = require('../../models/bench')

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
  createBench: async args => {
    const bench = new Bench({
      name: args.benchInput.name,
      description: args.benchInput.description,
      lockedDescription: args.benchInput.lockedDescription,
      geolocation: args.benchInput.geolocation,
      hashTags: args.benchInput.hashTags
    })
    try {
      const createdBench = await bench.save()
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
  }
}