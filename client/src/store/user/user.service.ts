import http from "../../utils/http.utils"
import { UserFormData } from "./user.type"

const API_URL = "/api/v1/admin/user"

const createUser = async (data: UserFormData) => {
  const form = new FormData()
  form.append("firstName", data.firstName)
  form.append("lastName", data.lastName)
  form.append("email", data.email)
  if (data.password) {
    form.append("password", data.password)
  }
  form.append("phoneNumber", data.phoneNumber)
  form.append("address", data.address)
  if (data.image) {
    form.append("image", data.image)
  }
  const resposne = await http.post(API_URL, form)
  return resposne.data
}

const getUsers = async () => {
  const response = await http.get(API_URL)
  return response.data
}

const getUser = async (id: string) => {
  const response = await http.get(`${API_URL}/${id}`)
  return response.data
}

const updateUser = async (id: string, data: UserFormData) => {
  const form = new FormData()
  form.append("firstName", data.firstName)
  form.append("lastName", data.lastName)
  form.append("email", data.email)
  if (data.password) {
    form.append("password", data.password)
  }
  form.append("phoneNumber", data.phoneNumber)
  form.append("address", data.address)

  if (data.image) {
    form.append("image", data.image)
  }
  const response = await http.patch(`${API_URL}/${id}`, form)
  return response.data
}

const deleteUser = async (id: string) => {
  const response = await http.delete(`${API_URL}/${id}`)
  return response.data
}

const UserService = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
}
export default UserService
