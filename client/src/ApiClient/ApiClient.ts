import { ApiBenchReponseRoot, QueryApiBenchReponse, ApiSingleBenchReponseRoot, ApiBench } from "../@types";

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