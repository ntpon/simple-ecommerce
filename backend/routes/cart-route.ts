import express from "express"
import { addToCart } from "../controllers/cart-controller"
import { auth } from "../middlewares/auth-middleware"

const router = express.Router()

router.post("/", auth, addToCart)

export default router
