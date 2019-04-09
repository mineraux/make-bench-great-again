import { ApiBenchReponseRoot, QueryApiBenchReponse } from "../@types";

class ApiClient {

  private queryBenchList = (args:QueryApiBenchReponse) => {
    const query = `
    query {
      benchList{
        ${args.name?'name':''}
        ${args.description?'description':''}
        ${args.lockedDescription?'lockedDescription':''}
      }
    }
    `
    return query
  }

  public getBenchList = async(fieldsToFetch:QueryApiBenchReponse): Promise<ApiBenchReponseRoot> => {
    let benchList: ApiBenchReponseRoot = []
    const query = this.queryBenchList(fieldsToFetch)
    const requestBody = {
      query: query
    }
    await (fetch('http://localhost:4000/api', {
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

}

export default new ApiClient()