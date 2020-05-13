import axios from 'axios'
const API_URL = 'http://localhost:5100'



const securedAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Token ' + process.env.VUE_APP_API_TOKEN
  }
})

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Token ' + process.env.VUE_APP_API_TOKEN
  }
})

securedAxiosInstance.interceptors.request.use(config => {
  const method = config.method.toUpperCase()
  if (method !== 'OPTIONS' && method !== 'GET') {
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': localStorage.csrf,
    }
  }
  return config
})

securedAxiosInstance.interceptors.response.use(null, error => {
  if (error.response && error.response.config && error.response.status === 401) {
    // If 401 by expired access cookie, we do a refresh request
    return plainAxiosInstance.post( process.env.VUE_APP_API + 'refresh', {}, {
        headers: {
          'X-CSRF-TOKEN': localStorage.csrf,
        }
      })
      .then(response => {
        localStorage.csrf = response.data.csrf
        localStorage.signedIn = true
        // After another successfull refresh - repeat original request
        let retryConfig = error.response.config
        retryConfig.headers['X-CSRF-TOKEN'] = localStorage.csrf
        return plainAxiosInstance.request(retryConfig)
      }).catch(error => {
        delete localStorage.csrf
        delete localStorage.signedIn
        // redirect to signin if refresh fails
        location.replace('/')
        return Promise.reject(error)
      })
  } else {
    return Promise.reject(error)
  }
})

export { securedAxiosInstance, plainAxiosInstance }
