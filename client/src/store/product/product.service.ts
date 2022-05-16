import http from "../../utils/http.utils"
import { ProductFormData } from "./product.type"

const API_URL = "/api/v1/admin/product"

const createProduct = async (data: ProductFormData) => {
  const form = new FormData()
  form.append("name", data.name)
  form.append("description", data.description)
  form.append("publisher", data.publisher!)
  form.append("price", data.price.toString())
  form.append("quantity", data.quantity.toString())

  if (data.authors) {
    for (const author of data.authors) {
      form.append("authors[]", author)
    }
  }

  if (data.categories) {
    for (const category of data.categories) {
      form.append("categories[]", category)
    }
  }

  if (data.image) {
    form.append("image", data.image)
  }

  if (data.images) {
    for (const img of data.images) {
      if (img.file) {
        form.append("images", img.file)
      }
    }
  }
  const resposne = await http.post(API_URL, form)
  return resposne.data
}

const getProducts = async () => {
  const response = await http.get(API_URL)
  return response.data
}

const getProduct = async (id: string) => {
  const response = await http.get(`${API_URL}/${id}`)
  return response.data
}

const updateProduct = async (id: string, data: ProductFormData) => {
  const form = new FormData()
  form.append("name", data.name)
  form.append("description", data.description)
  form.append("publisher", data.publisher!)
  form.append("price", data.price.toString())
  form.append("quantity", data.quantity.toString())

  if (data.authors) {
    for (const author of data.authors) {
      form.append("authors[]", author)
    }
  }

  if (data.categories) {
    for (const category of data.categories) {
      form.append("categories[]", category)
    }
  }

  if (data.image) {
    form.append("image", data.image)
  }
  if (data.currentImages) {
    for (const img of data.currentImages) {
      form.append("currentImages[]", img)
    }
  }

  if (data.images) {
    for (const img of data.images) {
      if (img.file) {
        form.append("images", img.file)
      }
    }
  }
  const response = await http.patch(`${API_URL}/${id}`, form)
  return response.data
}

const deleteProduct = async (id: string) => {
  const response = await http.delete(`${API_URL}/${id}`)
  return response.data
}

const productService = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
}
export default productService
