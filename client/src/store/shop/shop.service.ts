import http from "../../utils/http.utils"

const API_PRODUCT_URL = "/api/v1/product"

const API_CATEGORY_URL = "/api/v1/category"

const getProductsFormSearch = async (search: string) => {
  const response = await http.get(API_PRODUCT_URL + "/search?value=" + search)
  return response.data
}
const getProductsForHomeIndex = async () => {
  const response = await http.get(API_PRODUCT_URL + "/home")
  return response.data
}

const getCategories = async () => {
  const response = await http.get(API_CATEGORY_URL)
  return response.data
}

const getProductByCategorySlug = async (slug: string) => {
  const response = await http.get(`${API_CATEGORY_URL}/${slug}/products`)
  return response.data
}

const getProductsInShop = async () => {
  const response = await http.get(API_PRODUCT_URL)
  return response.data
}

const getProductInShop = async (slug: string) => {
  const response = await http.get(`${API_PRODUCT_URL}/${slug}`)
  return response.data
}

const shopService = {
  getProductInShop,
  getProductsInShop,
  getCategories,
  getProductByCategorySlug,
  getProductsForHomeIndex,
  getProductsFormSearch,
}
export default shopService
