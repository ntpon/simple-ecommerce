import express from "express"
import {
  getCartItems,
  getCartItemsById,
  updateStatusCartItemById,
} from "../../controllers/admin/cart-item-controller"
import { auth, authRole } from "../../middlewares/auth-middleware"
const router = express.Router()

router.get("/", auth, authRole("admin"), getCartItems)
router.get("/:id", auth, authRole("admin"), getCartItemsById)
router.patch("/:id", auth, authRole("admin"), updateStatusCartItemById)

export default router
