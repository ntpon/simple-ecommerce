import express from "express"
import { check } from "express-validator"
import {
  createCategory,
  deleteCategoryById,
  getCategory,
  getCategoryById,
  updateCategory,
} from "../../controllers/admin/category-controller"

import { auth, authRole } from "../../middlewares/auth-middleware"
const router = express.Router()

router.get("/", auth, authRole("admin"), getCategory)

router.get("/:id", auth, authRole("admin"), getCategoryById)

router.post(
  "/",
  auth,
  authRole("admin"),
  //   imageUpload.single("avatar"),
  [check("name").not().isEmpty(), check("description").not().isEmpty()],
  createCategory
)

router.patch(
  "/:id",
  auth,
  authRole("admin"),
  //   imageUpload.single("avatar"),
  [check("name").not().isEmpty(), check("description").not().isEmpty()],
  updateCategory
)
router.delete("/:id", auth, authRole("admin"), deleteCategoryById)

export default router
