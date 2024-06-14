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

// const UNAUTHORIZED = 401 // Assuming UNAUTHORIZED is a constant representing the status code for unauthorized

// const API: AxiosInstance = axios.create(options)

// API.interceptors.response.use(
//   (response: AxiosResponse) => response.data,
//   async (error: AxiosError) => {
//     const { config, response } = error
//     const { status, data } = response || {}

//     // try to refresh the access token behind the scenes
//     if (status === UNAUTHORIZED && data?.errorCode === 'InvalidAccessToken') {
//       try {
//         // refresh the access token, then retry the original request
//         await TokenRefreshClient.get('/auth/refresh')
//         return TokenRefreshClient(config)
//       } catch (error) {
//         // handle refresh errors by clearing the query cache & redirecting to login
//         queryClient.clear()
//         navigate('/login', {
//           state: {
//             redirectUrl: window.location.pathname
//           }
//         })
//       }
//     }

//     return Promise.reject({ status, ...data })
//   }
// )
