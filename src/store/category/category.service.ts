import http from "../../utils/http.utils"
import { CategoryFormData } from "./category.type"
const API_URL = "/api/v1/admin/category"

const createCategory = async (data: CategoryFormData) => {
  const response = await http.post(API_URL, data)
  return response.data
}

const getCategory = async (id: string) => {
  const response = await http.get(`${API_URL}/${id}`)
  return response.data
}

const updateCategory = async (id: string, data: CategoryFormData) => {
  const response = await http.patch(`${API_URL}/${id}`, data)
  return response.data
}

const deleteCategory = async (id: string) => {
  const response = await http.delete(`${API_URL}/${id}`)
  return response.data
}

const getCategories = async (page: number) => {
  const response = await http.get(`${API_URL}?page=${page}`)
  return response.data
}
const getCategoriesAll = async () => {
  const response = await http.get(`${API_URL}/all`)
  return response.data
}

const categoryService = {
  getCategories,
  getCategoriesAll,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}

export default categoryService
