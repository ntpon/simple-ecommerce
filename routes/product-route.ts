import express from "express"
import {
  getProductBySlug,
  getProductForHomeIndex,
  getProducts,
  getProductFromSearch,
} from "../controllers/product-controller"

const router = express.Router()

router.get("/", getProducts)
router.get("/home", getProductForHomeIndex)
router.get("/search", getProductFromSearch)
router.get("/:slug", getProductBySlug)

export default router
