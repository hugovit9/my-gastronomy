import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
})


api.interceptors.request.use(config => {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}")
  const token = auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
