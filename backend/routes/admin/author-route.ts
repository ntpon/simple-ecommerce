import express from "express"
import { check } from "express-validator"
import {
  createAuthor,
  deleteAuthorById,
  getAuthorById,
  getAuthors,
  getAuthorsAll,
  updateAuthor,
} from "../../controllers/admin/author-controller"

import { auth, authRole } from "../../middlewares/auth-middleware"
import imageUpload from "../../middlewares/image-upload"
const router = express.Router()

router.get("/", auth, authRole("admin"), getAuthors)
router.get("/all", auth, authRole("admin"), getAuthorsAll)

router.get("/:id", auth, authRole("admin"), getAuthorById)

router.post(
  "/",
  auth,
  authRole("admin"),
  imageUpload.single("image"),
  [check("name").not().isEmpty(), check("description").not().isEmpty()],
  createAuthor
)

router.patch(
  "/:id",
  auth,
  authRole("admin"),
  imageUpload.single("image"),
  [check("name").not().isEmpty(), check("description").not().isEmpty()],
  updateAuthor
)
router.delete("/:id", auth, authRole("admin"), deleteAuthorById)

export default router
