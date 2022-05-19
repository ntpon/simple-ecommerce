import express from "express"
import { check } from "express-validator"
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUser,
} from "../../controllers/admin/user-controller"
import { auth, authRole } from "../../middlewares/auth-middleware"
import imageUpload from "../../middlewares/image-upload"
const router = express.Router()

router.get("/", auth, authRole("admin"), getUsers)

router.get("/:id", auth, authRole("admin"), getUserById)

router.post(
  "/",
  auth,
  authRole("admin"),
  imageUpload.single("image"),
  [
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    check("phoneNumber").not().isEmpty(),
    check("address").not().isEmpty(),
  ],
  createUser
)

router.patch(
  "/:id",
  auth,
  authRole("admin"),
  imageUpload.single("image"),
  [
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("email").not().isEmpty(),
    check("phoneNumber").not().isEmpty(),
    check("address").not().isEmpty(),
  ],
  updateUser
)
router.delete("/:id", auth, authRole("admin"), deleteUserById)

export default router
