import http from "../../utils/http.utils"
import { getUserFromStorage } from "../../utils/user.utils"
import { Password, Profile, UserData, UserLogin } from "./auth.type"

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

const getProfile = async () => {
  const response = await http.get(API_URL + "/me")
  return response.data
}

const updateProfile = async (userData: Profile) => {
  const response = await http.patch(API_URL + "/me", userData)
  if (response.data) {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...getUserFromStorage(), user: response.data.data.user })
    )
  }
  return response.data
}

const updatePassword = async (passwordData: Password) => {
  const response = await http.patch(API_URL + "/password", passwordData)

  return response.data
}
const authService = {
  register,
  logout,
  login,
  getProfile,
  updateProfile,
  updatePassword,
}

export default authService
