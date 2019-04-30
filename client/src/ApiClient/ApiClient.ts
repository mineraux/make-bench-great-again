import { ApiBenchReponseRoot, QueryApiBenchReponse, ApiSingleBenchReponseRoot, ApiBench, createApiBenchMutation, updateApiBench } from "../@types";

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

  public createBench = async (fields: createApiBenchMutation): Promise<ApiBench> => {
    const query = this.mutationCreateBench(fields)
    let dataResponse = {
      createBench: {
        _id:""
      }
    }

    const requestBody = {
      query: query
    }

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
        return res.json()
      })
      .then(res => dataResponse.createBench = res.data.createBench);
      return dataResponse.createBench
  }

  public updateBench = async (fields: ApiBench): Promise<ApiBench> => {
    const query = this.mutationUpdateBench(fields)

    let dataResponse = {
      updateBench: {
        _id:""
      }
    }

    const requestBody = {
      query: query
    }

    await (fetch(`${process.env.REACT_APP_PATH_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
    }))
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw Error('Erreur lors de la mise à jour du banc')
        }
        return res.json()
      })
      .then(res => dataResponse.updateBench = res.data.updateBench);

      return dataResponse.updateBench
  }

  public deleteBench = async (benchID: ApiBench["_id"]): Promise<ApiBench> => {
    const query = this.mutationDeleteBench(benchID)

    let dataResponse = {
      deleteBench: {
        _id:""
      }
    }

    const requestBody = {
      query: query
    }

    await (fetch(`${process.env.REACT_APP_PATH_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
    }))
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw Error('Erreur lors de la suppression du banc')
        }
        return res.json()
      })
      .then(res => dataResponse.deleteBench = res.data.deleteBench);

      return dataResponse.deleteBench
  }

  public getBenchList = async (fieldsToFetch: QueryApiBenchReponse): Promise<ApiBenchReponseRoot> => {
    let benchList: ApiBenchReponseRoot = []
    const query = this.queryBenchList(fieldsToFetch)
    const requestBody = {
      query: query
    }
    await (fetch(`${process.env.REACT_APP_PATH_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
    }))
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw Error('Failed')
        }
        return res.json()
      })
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
    const query = this.querySingleBench(benchID, fieldsToFetch)
    const requestBody = {
      query: query
    }
    await (fetch(`${process.env.REACT_APP_PATH_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
    }))
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw Error('Failed')
        }
        return res.json()
      })
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