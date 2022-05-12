import http from "../../utils/http.utils"
const API_URL = "/api/v1/admin/category"

const createCategory = async (data) => {
  const response = await http.post(API_URL, data)
  return response.data
}

const getCategory = async (id) => {
  const response = await http.get(`${API_URL}/${id}`)
  return response.data
}

const updateCategory = async (id, data) => {
  const response = await http.patch(`${API_URL}/${id}`, data)
  return response.data
}

const deleteCategory = async (id) => {
  const response = await http.delete(`${API_URL}/${id}`)
  return response.data
}

const getCategories = async () => {
  const response = await http.get(API_URL)
  return response
}

const categoryService = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}

export default categoryService
