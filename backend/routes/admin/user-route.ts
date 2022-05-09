import express from "express"
import { getUsers } from "../../controllers/admin/user-controller"
const router = express.Router()

router.get("/", getUsers)
export default router
