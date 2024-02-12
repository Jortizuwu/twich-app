import axios from 'axios'

export const BASE_API = axios.create({
  baseURL: 'http://localhost:3000/api',
})

// BASE_API.interceptors.request.use(async (confing) => {
//   const token = window.localStorage.getItem('token')
//   if (token) {
//     confing.headers.Authorization = `Bearer ${token}`
//   }
//   return confing
// })
