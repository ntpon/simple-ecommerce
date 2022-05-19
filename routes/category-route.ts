import express from "express"
import {
  getCategories,
  getProductsByCategorySlug,
} from "../controllers/category-controller"
const router = express.Router()

router.get("/", getCategories)
router.get("/:slug/products", getProductsByCategorySlug)
export default router
