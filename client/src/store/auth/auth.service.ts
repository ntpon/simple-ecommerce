import http from "../../utils/http.utils"
import { UserData, UserLogin } from "./auth.type"

const API_URL = "/api/v1/auth"

const register = async (userData: UserData) => {
  const response = await http.post(API_URL, userData)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data))
  }
  return response.data
}

const login = async (userData: UserLogin) => {
  const response = await http.post(API_URL + "/login", userData)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data))
  }
  return response.data
}

const logout = () => localStorage.removeItem("user")

const authService = {
  register,
  logout,
  login,
}

export default authService
