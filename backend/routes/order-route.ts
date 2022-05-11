import express from "express"
import { getMyOrder } from "../controllers/order-controller"
import { auth } from "../middlewares/auth-middleware"

const router = express.Router()

router.get("/", auth, getMyOrder)

export default router
