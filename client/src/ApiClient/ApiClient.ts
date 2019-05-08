import {
  ApiInstallationReponseRoot,
  QueryApiInstallationReponse,
  ApiSingleInstallationReponseRoot,
  ApiInstallation,
  createApiInstallationMutation,
  ApiPetition,
  createApiPetitionMutation,
  createApiPetition,
} from '../@types'

type graphqlQuery = {
  query: string
}

type mongoResponse = {
  data: {
    updateInstallation?: {
      _id: ''
    }
    createInstallation?: {
      _id: string
    }
    deleteInstallation?: {
      _id: string
    }
    installationList?: ApiInstallation[]
    singleInstallation?: {
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
  public createInstallation = async (
    fields: createApiInstallationMutation
  ): Promise<ApiInstallation> => {
    const dataResponse = {
      createInstallation: {
        _id: '',
      },
    }

    const requestBody = {
      query: this.mutationCreateInstallation(fields),
    }

    await this.apiCall(requestBody).then(res => {
      if (res.data.createInstallation) {
        dataResponse.createInstallation = res.data.createInstallation
      }
    })

    return dataResponse.createInstallation
  }

  public updateInstallation = async (
    fields: ApiInstallation
  ): Promise<ApiInstallation> => {
    const dataResponse = {
      updateInstallation: {
        _id: '',
      },
    }

    const requestBody = {
      query: this.mutationUpdateInstallation(fields),
    }

    await this.apiCall(requestBody).then(res => {
      if (res.data.updateInstallation) {
        dataResponse.updateInstallation = res.data.updateInstallation
      }
    })

    return dataResponse.updateInstallation
  }

  public deleteInstallation = async (
    installationID: ApiInstallation['_id']
  ): Promise<ApiInstallation> => {
    const dataResponse = {
      deleteInstallation: {
        _id: '',
      },
    }

    const requestBody = {
      query: this.mutationDeleteInstallation(installationID),
    }

    await this.apiCall(requestBody).then(res => {
      if (res.data.deleteInstallation) {
        dataResponse.deleteInstallation = res.data.deleteInstallation
      }
    })

    return dataResponse.deleteInstallation
  }

  public getInstallationList = async (
    fieldsToFetch: QueryApiInstallationReponse
  ): Promise<ApiInstallationReponseRoot> => {
    let installationList: ApiInstallationReponseRoot = []

    const requestBody = {
      query: this.queryInstallationList(fieldsToFetch),
    }
    await this.apiCall(requestBody)
      .then(res => {
        if (res.data.installationList) {
          installationList = res.data.installationList
        }
      })
      .catch(err => {
        console.log(err)
      })

    return installationList
  }

  public getSingleInstallation = async (
    installationID: ApiInstallation['_id'],
    fieldsToFetch: QueryApiInstallationReponse
  ): Promise<ApiSingleInstallationReponseRoot> => {
    let installation: ApiInstallation = { _id: '' }
    const requestBody = {
      query: this.querySingleInstallation(installationID, fieldsToFetch),
    }
    await this.apiCall(requestBody)
      .then(resData => {
        if (resData.data.singleInstallation) {
          installation = resData.data.singleInstallation
        }
      })
      .catch(err => {
        console.log(err)
      })

    return installation
  }

  public createPetition = async (
    fields: createApiPetitionMutation
  ): Promise<ApiPetition> => {
    const dataResponse = {
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
    const dataResponse = {
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
  private queryInstallationList = (
    fieldsToFetch: QueryApiInstallationReponse
  ) => {
    const query = `
    query {
      installationList{
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

  private querySingleInstallation = (
    installationId: ApiInstallation['_id'],
    fieldsToFetch: QueryApiInstallationReponse
  ) => {
    const query = `
    query {
      singleInstallation(installationId:"${installationId}") {
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

  private mutationCreateInstallation = (
    fields: createApiInstallationMutation
  ) => {
    const geolocation = [fields.latitude, fields.longitude]
    const query = `
    mutation {
      createInstallation(
        installationInput: {
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

  private mutationUpdateInstallation = (fields: ApiInstallation) => {
    const fieldsToUpdate: ApiInstallation = {
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
      updateInstallation(
        updateInstallationInput:
          ${formatedQuery}
      ){
        _id
        name
      }
    }
    `

    return query
  }

  private mutationDeleteInstallation = (
    installationID: ApiInstallation['_id']
  ) => {
    const query = `
    mutation {
      deleteInstallation(installationId:"${installationID}") {
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

  private mutationCreatePetition = (fields: createApiPetitionMutation) => {
    const fieldsToUpdate: createApiPetition = {
      subscribers: fields.subscribers,
      relatedInstallation:
        fields.relatedInstallation && fields.relatedInstallation.length > 0
          ? fields.relatedInstallation
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
}

export default new ApiClient()
