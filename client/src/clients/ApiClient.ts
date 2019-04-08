import { ApiBenchReponseRoot } from "../@types";

class ApiClient {

  public getBenchList = async(): Promise<ApiBenchReponseRoot> => {
    let benchList: ApiBenchReponseRoot = []
    
    const requestBody = {
      query: `
        query {
          benchList{
            name
          }
        }
      `
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