import axios from 'axios'
import normalizer from 'json-api-normalizer'

export const client = axios.create({
  baseURL: 'http://localhost:8080/api/'
})

client.interceptors.response.use(response => {
  if (response.data) {
    response.data = normalizer(response.data)
  }

  return response
})
