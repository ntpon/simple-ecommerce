import express from "express"
import { check } from "express-validator"
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
} from "../../controllers/admin/product-controller"
import { deletePublisherById } from "../../controllers/admin/publisher-controller"

import { auth, authRole } from "../../middlewares/auth-middleware"
import imageUpload from "../../middlewares/image-upload"
const router = express.Router()

router.get("/", auth, authRole("admin"), getProducts)

router.get("/:id", auth, authRole("admin"), getProductById)

router.post(
  "/",
  auth,
  authRole("admin"),
  imageUpload.fields([
    { name: "images", maxCount: 4 },
    { name: "image", maxCount: 2 },
  ]),
  [
    check("name").not().isEmpty(),
    check("description").not().isEmpty(),
    check("categories").not().isEmpty(),
    check("authors").not().isEmpty(),
    check("publisher").not().isEmpty(),
    check("price").not().isEmpty(),
    check("quantity").not().isEmpty(),
  ],
  createProduct
)

router.patch(
  "/:id",
  auth,
  authRole("admin"),
  imageUpload.fields([
    { name: "images", maxCount: 4 },
    { name: "image", maxCount: 2 },
  ]),
  [
    check("name").not().isEmpty(),
    check("description").not().isEmpty(),
    check("categories").not().isEmpty(),
    check("authors").not().isEmpty(),
    check("publisher").not().isEmpty(),
    check("price").not().isEmpty(),
    check("quantity").not().isEmpty(),
  ],
  updateProduct
)
router.delete("/:id", auth, authRole("admin"), deleteProductById)

export default router
