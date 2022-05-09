import express from "express"
import { check } from "express-validator"
import { signup } from "../controllers/auth-controller"

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

export default router
