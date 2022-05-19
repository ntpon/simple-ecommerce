import express from "express"
import { check } from "express-validator"
import {
  createPublisher,
  deletePublisherById,
  getPublisherById,
  getPublishers,
  getPublishersAll,
  updatePublisher,
} from "../../controllers/admin/publisher-controller"

import { auth, authRole } from "../../middlewares/auth-middleware"
const router = express.Router()

router.get("/", auth, authRole("admin"), getPublishers)
router.get("/all", auth, authRole("admin"), getPublishersAll)

router.get("/:id", auth, authRole("admin"), getPublisherById)

router.post(
  "/",
  auth,
  authRole("admin"),
  //   imageUpload.single("avatar"),
  [check("name").not().isEmpty(), check("description").not().isEmpty()],
  createPublisher
)

router.patch(
  "/:id",
  auth,
  authRole("admin"),
  //   imageUpload.single("avatar"),
  [check("name").not().isEmpty(), check("description").not().isEmpty()],
  updatePublisher
)
router.delete("/:id", auth, authRole("admin"), deletePublisherById)

export default router
