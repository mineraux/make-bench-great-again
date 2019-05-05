import {
  ApiBenchReponseRoot,
  QueryApiBenchReponse,
  ApiSingleBenchReponseRoot,
  ApiBench,
  createApiBenchMutation,
  ApiPetition,
  createApiPetitionMutation,
  createApiPetition,
} from '../@types'

type graphqlQuery = {
  query: string
}

type mongoResponse = {
  data: {
    updateBench?: {
      _id: ''
    }
    createBench?: {
      _id: string
    }
    deleteBench?: {
      _id: string
    }
    benchList?: ApiBench[]
    singleBench?: {
      _id: string
    }
    createPetition?: {
      _id: string
    }
    deletePetition?: {
      _id: string
    }
  }
}

class ApiClient {
  private queryBenchList = (fieldsToFetch: QueryApiBenchReponse) => {
    const query = `
    query {
      benchList{
        _id
        ${fieldsToFetch.name ? 'name' : ''}
        ${fieldsToFetch.description ? 'description' : ''}
        ${fieldsToFetch.lockedDescription ? 'lockedDescription' : ''}
        ${fieldsToFetch.geolocation ? 'geolocation' : ''}
      }
    }
    `
    return query
  }

  private querySingleBench = (
    benchId: ApiBench['_id'],
    fieldsToFetch: QueryApiBenchReponse
  ) => {
    const query = `
    query {
      singleBench(benchId:"${benchId}") {
        _id
        ${fieldsToFetch.name ? 'name' : ''}
        ${fieldsToFetch.description ? 'description' : ''}
        ${fieldsToFetch.lockedDescription ? 'lockedDescription' : ''}
        ${fieldsToFetch.geolocation ? 'geolocation' : ''}
      }
    }
    `
    return query
  }

  private mutationCreateBench = (fields: createApiBenchMutation) => {
    const geolocation = [fields.latitude, fields.longitude]
    const query = `
    mutation {
      createBench(
        benchInput: {
          name:"${fields.name}",
          description:"${fields.description}",
          lockedDescription:"${fields.lockedDescription}",
          geolocation:[${geolocation}],
          hashTags:[${fields.hashtags}],
          testimony:"${fields.testimony}"
        }){
            _id
            name
      }
    }
    `

    return query
  }

  private mutationUpdateBench = (fields: ApiBench) => {
    const fieldsToUpdate: ApiBench = {
      _id: fields._id,
      name: fields.name,
      description: fields.description,
      lockedDescription: fields.lockedDescription,
      geolocation: fields.geolocation,
      hashTags: fields.hashTags,
      testimony: fields.testimony,
    }

    const formatedQuery = JSON.stringify(fieldsToUpdate).replace(
      /"(\w+)"\s*:/g,
      '$1:'
    )

    const query = `
    mutation {
      updateBench(
        updateBenchInput:
          ${formatedQuery}
      ){
        _id
        name
      }
    }
    `

    return query
  }

  private mutationDeleteBench = (benchID: ApiBench['_id']) => {
    const query = `
    mutation {
      deleteBench(benchId:"${benchID}") {
        _id
        name
      }
    }
    `

    return query
  }

  private mutationDeletePetition = (petitionId: ApiPetition['_id']) => {
    const query = `
      mutation {
        deletePetition(petitionId:"${petitionId}"){
          _id
        }
      }
    `

    return query
  }

  private apiCall = async (
    requestBody: graphqlQuery
  ): Promise<mongoResponse> => {
    let response: mongoResponse = {
      data: {},
    }

    await fetch(`${process.env.REACT_APP_PATH_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw Error('Erreur lors de la création du banc')
        }
        return res.json()
      })
      .then(res => {
        response = res
        return res
      })

    return response
  }

  public createBench = async (
    fields: createApiBenchMutation
  ): Promise<ApiBench> => {
    let dataResponse = {
      createBench: {
        _id: '',
      },
    }

    const requestBody = {
      query: this.mutationCreateBench(fields),
    }

    await this.apiCall(requestBody).then(res => {
      if (res.data.createBench) {
        dataResponse.createBench = res.data.createBench
      }
    })

    return dataResponse.createBench
  }

  public updateBench = async (fields: ApiBench): Promise<ApiBench> => {
    let dataResponse = {
      updateBench: {
        _id: '',
      },
    }

    const requestBody = {
      query: this.mutationUpdateBench(fields),
    }

    await this.apiCall(requestBody).then(res => {
      if (res.data.updateBench) {
        dataResponse.updateBench = res.data.updateBench
      }
    })

    return dataResponse.updateBench
  }

  public deleteBench = async (benchID: ApiBench['_id']): Promise<ApiBench> => {
    let dataResponse = {
      deleteBench: {
        _id: '',
      },
    }

    const requestBody = {
      query: this.mutationDeleteBench(benchID),
    }

    await this.apiCall(requestBody).then(res => {
      if (res.data.deleteBench) {
        dataResponse.deleteBench = res.data.deleteBench
      }
    })

    return dataResponse.deleteBench
  }

  public getBenchList = async (
    fieldsToFetch: QueryApiBenchReponse
  ): Promise<ApiBenchReponseRoot> => {
    let benchList: ApiBenchReponseRoot = []

    const requestBody = {
      query: this.queryBenchList(fieldsToFetch),
    }
    await this.apiCall(requestBody)
      .then(res => {
        if (res.data.benchList) {
          benchList = res.data.benchList
        }
      })
      .catch(err => {
        console.log(err)
      })

    return benchList
  }

  public getSingleBench = async (
    benchID: ApiBench['_id'],
    fieldsToFetch: QueryApiBenchReponse
  ): Promise<ApiSingleBenchReponseRoot> => {
    let bench: ApiBench = { _id: '' }
    const requestBody = {
      query: this.querySingleBench(benchID, fieldsToFetch),
    }
    await this.apiCall(requestBody)
      .then(resData => {
        if (resData.data.singleBench) {
          bench = resData.data.singleBench
        }
      })
      .catch(err => {
        console.log(err)
      })

    return bench
  }

  private mutationCreatePetition = (fields: createApiPetitionMutation) => {
    const fieldsToUpdate: createApiPetition = {
      subscribers: fields.subscribers,
      relatedBench:
        fields.relatedBench && fields.relatedBench.length > 0
          ? fields.relatedBench
          : null,
    }

    const formatedQuery = JSON.stringify(fieldsToUpdate).replace(
      /"(\w+)"\s*:/g,
      '$1:'
    )

    const query = `
    mutation {
      createPetition(
        petitionInput:
          ${formatedQuery}
        ){
          _id
      }
    }
    `

    return query
  }

  public createPetition = async (
    fields: createApiPetitionMutation
  ): Promise<ApiPetition> => {
    let dataResponse = {
      createPetition: {
        _id: '',
      },
    }

    const requestBody = {
      query: this.mutationCreatePetition(fields),
    }

    await this.apiCall(requestBody).then(res => {
      if (res.data.createPetition) {
        dataResponse.createPetition = res.data.createPetition
      }
    })

    return dataResponse.createPetition
  }

  public deletePetition = async (
    petitionID: ApiPetition['_id']
  ): Promise<ApiPetition> => {
    let dataResponse = {
      deletePetition: {
        _id: '',
      },
    }

    const requestBody = {
      query: this.mutationDeletePetition(petitionID),
    }

    await this.apiCall(requestBody).then(res => {
      if (res.data.deletePetition) {
        dataResponse.deletePetition = res.data.deletePetition
      }
    })

    return dataResponse.deletePetition
  }
}

export default new ApiClient()
