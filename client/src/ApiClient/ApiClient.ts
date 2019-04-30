import { ApiBenchReponseRoot, QueryApiBenchReponse, ApiSingleBenchReponseRoot, ApiBench, createApiBenchMutation, updateApiBench } from "../@types";

type graphqlQuery = {
  query : string
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

  private querySingleBench = (benchId: ApiBench["_id"], fieldsToFetch: QueryApiBenchReponse) => {
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
          hashTags:["#1"]}){
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
      geolocation: fields.geolocation
    };

    const formatedQuery = JSON.stringify(fieldsToUpdate).replace(/"(\w+)"\s*:/g, '$1:');

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

  private mutationDeleteBench = (benchID: ApiBench["_id"]) => {

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

  private apiCall = async (requestBody: graphqlQuery): Promise<any> => {
    let response

    await (fetch(`${process.env.REACT_APP_PATH_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
    }))
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw Error('Erreur lors de la création du banc')
        }
        response = res.json()
      })

    return response
  }

  public createBench = async (fields: createApiBenchMutation): Promise<ApiBench> => {
    let dataResponse = {
      createBench: {
        _id: ""
      }
    }

    const requestBody = {
      query: this.mutationCreateBench(fields)
    }

    await this.apiCall(requestBody)
      .then(res => {
        dataResponse.createBench = res.data.createBench
      });

    return dataResponse.createBench
  }

  public updateBench = async (fields: ApiBench): Promise<ApiBench> => {
    let dataResponse = {
      updateBench: {
        _id: ""
      }
    }

    const requestBody = {
      query: this.mutationUpdateBench(fields)
    }

    await this.apiCall(requestBody)
      .then(res => dataResponse.updateBench = res.data.updateBench);

    return dataResponse.updateBench
  }

  public deleteBench = async (benchID: ApiBench["_id"]): Promise<ApiBench> => {
    let dataResponse = {
      deleteBench: {
        _id: ""
      }
    }

    const requestBody = {
      query: this.mutationDeleteBench(benchID)
    }

    await this.apiCall(requestBody)
      .then(res => dataResponse.deleteBench = res.data.deleteBench);

    return dataResponse.deleteBench
  }

  public getBenchList = async (fieldsToFetch: QueryApiBenchReponse): Promise<ApiBenchReponseRoot> => {
    let benchList: ApiBenchReponseRoot = []

    const requestBody = {
      query: this.queryBenchList(fieldsToFetch)
    }
    await this.apiCall(requestBody)
      .then(resData => {
        benchList = resData.data.benchList
      })
      .catch(err => {
        console.log(err)
      })

    return benchList
  }

  public getSingleBench = async (benchID: ApiBench["_id"], fieldsToFetch: QueryApiBenchReponse): Promise<ApiSingleBenchReponseRoot> => {
    let bench: ApiBench = { _id: "" }
    const requestBody = {
      query: this.querySingleBench(benchID, fieldsToFetch)
    }
    await this.apiCall(requestBody)
      .then(resData => {
        bench = resData.data.singleBench
      })
      .catch(err => {
        console.log(err)
      })

    return bench
  }

}

export default new ApiClient()