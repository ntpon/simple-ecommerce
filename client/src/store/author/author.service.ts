import http from "../../utils/http.utils"
import { AuthorFormData } from "./author.type"

const API_URL = "/api/v1/admin/author"

const createAuthor = async (data: AuthorFormData) => {
  const form = new FormData()
  form.append("name", data.name)
  form.append("description", data.description)
  if (data.image) {
    form.append("image", data.image)
  }
  const resposne = await http.post(API_URL, form)
  return resposne.data
}

const getAuthors = async () => {
  const response = await http.get(API_URL)
  return response.data
}

const getAuthor = async (id: string) => {
  const response = await http.get(`${API_URL}/${id}`)
  return response.data
}

const updateAuthor = async (id: string, data: AuthorFormData) => {
  const form = new FormData()
  form.append("name", data.name)
  form.append("description", data.description)
  if (data.image) {
    form.append("image", data.image)
  }
  const response = await http.patch(`${API_URL}/${id}`, form)
  return response.data
}

const deleteAuthor = async (id: string) => {
  const response = await http.delete(`${API_URL}/${id}`)
  return response.data
}

const authorService = {
  createAuthor,
  getAuthor,
  getAuthors,
  updateAuthor,
  deleteAuthor,
}
export default authorService
