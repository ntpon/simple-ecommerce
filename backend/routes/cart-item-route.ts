import express from "express"
import { getMyCartItem } from "../controllers/cart-item-controller"
import { auth } from "../middlewares/auth-middleware"

const router = express.Router()
router.get("/", auth, getMyCartItem)

export default router
