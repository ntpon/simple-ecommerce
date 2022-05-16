import http from "../../utils/http.utils"
import { PublisherFormData } from "./publisher.type"
const API_URL = "/api/v1/admin/publisher"

const createPublisher = async (data: PublisherFormData) => {
  const response = await http.post(API_URL, data)
  return response.data
}

const getPublisher = async (id: string) => {
  const response = await http.get(`${API_URL}/${id}`)
  return response.data
}

const updatePublisher = async (id: string, data: PublisherFormData) => {
  const response = await http.patch(`${API_URL}/${id}`, data)
  return response.data
}

const deletePublisher = async (id: string) => {
  const response = await http.delete(`${API_URL}/${id}`)
  return response.data
}

const getPublishers = async () => {
  const response = await http.get(API_URL)
  return response.data
}

const publisherService = {
  getPublishers,
  getPublisher,
  createPublisher,
  updatePublisher,
  deletePublisher,
}

export default publisherService
