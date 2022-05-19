import axios from "axios"
import { getUserFromStorage } from "./user.utils"

const http = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
})

// const user = getUserFromStorage()

// if (user) {
//   http.defaults.headers.common["Authorization"] = `Bearer ${user.token}`
// }

export const setHttpToken = (token: string | undefined) => {
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    http.defaults.headers.common["Authorization"] = ""
  }
}
export default http
