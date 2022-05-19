import express from "express"
import { check } from "express-validator"
import {
  login,
  me,
  signup,
  updateMe,
  updatePassword,
} from "../controllers/auth-controller"
import { auth } from "../middlewares/auth-middleware"

const router = express.Router()

router.post(
  "/",
  [
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("email").not().isEmpty(),
    check("phoneNumber").not().isEmpty(),
    check("password").not().isEmpty(),
  ],
  signup
)

router.post(
  "/login",
  [check("email").not().isEmpty(), check("password").not().isEmpty()],
  login
)

router.get("/me", auth, me)

router.patch(
  "/me",
  [
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("phoneNumber").not().isEmpty(),
    check("address").not().isEmpty(),
  ],
  auth,
  updateMe
)
router.patch(
  "/password",
  [check("password").not().isEmpty(), check("oldPassword").not().isEmpty()],
  auth,
  updatePassword
)
export default router
