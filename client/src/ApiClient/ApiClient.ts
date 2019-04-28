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
            name
      }
    }
    `
    return query
  }

  private mutationUpdateBench = (fields: ApiBench) => {
    // const geolocation = [fields.latitude, fields.longitude]

    const fieldsToUpdate:ApiBench = {
      _id:fields._id,
      name:fields.name
    };

    const newObject = {};

    const query = `
    mutation {
      updateBench(
        updateBenchInput:
          ${ JSON.stringify(newObject)}
      ){
        name
        description
      }
    }
    `

    // console.log(query)

    return query

  }

  public createBench = async (fields: createApiBenchMutation) => {
    const query = this.mutationCreateBench(fields)

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
    })
  }

  public updateBench = async (fields: ApiBench) => {
    const query = this.mutationUpdateBench(fields)

    const requestBody = {
      query: query
    }

    console.log(requestBody)

    

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
    })


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
    let bench: ApiBench = {_id: ""}
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