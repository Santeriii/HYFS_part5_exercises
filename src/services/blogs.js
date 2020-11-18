import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  try {
  const config = {
    headers: { Authorization: token },
  }

  await axios.post(baseUrl, newObject, config)
  return true
  }
  catch (error) {
    console.log(error)
    return false
  }
}

const put = async ( oldObject, id ) => {
  try {
    const config = {
      headers: { Authorization: token },
    }
  
    await axios.put(baseUrl + '/' + id, oldObject, config)
    return true
    }
    catch (error) {
      console.log(error)
      return false
    }
}

export default { getAll, setToken, create, put }