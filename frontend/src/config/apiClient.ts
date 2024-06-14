import axios, { AxiosInstance, AxiosResponse } from 'axios'

const options = {
  baseURL: 'http://localhost:3000',
  withCredentials: true
}

const API: AxiosInstance = axios.create(options)

API.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error) => {
    const { status, data } = error.response
    return Promise.reject({ status, ...data })
  }
)

export default API
