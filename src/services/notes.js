import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'
let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAll = async () => {
  const res = await axios.get(baseUrl)
  const { data } = res
  return data
}

export const create = async ({ content, important }) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const res = await axios
    .post(baseUrl, { content, important }, config)
  const { data } = res
  return data
}

export const update = async (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  const response = await request
  return response.data
}
