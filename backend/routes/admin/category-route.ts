import express from "express"
import { check } from "express-validator"
import {
  createCategory,
  deleteCategoryById,
  getCategory,
  getCategoryAll,
  getCategoryById,
  updateCategory,
} from "../../controllers/admin/category-controller"

import { auth, authRole } from "../../middlewares/auth-middleware"
const router = express.Router()

router.get("/", auth, authRole("admin"), getCategory)
router.get("/all", auth, authRole("admin"), getCategoryAll)

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
