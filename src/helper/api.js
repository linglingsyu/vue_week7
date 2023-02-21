import axios from 'axios'

const config = {
  baseURL: import.meta.env.VITE_API,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json'
  }
}

const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
  '$1'
)

// if (token) {
//   config.headers.Authorization = token
// }

const api_path = import.meta.env.VITE_APIPATH

const API = axios.create(config)

if (token) {
  API.defaults.headers.common.Authorization = token
}

export { API, api_path }
