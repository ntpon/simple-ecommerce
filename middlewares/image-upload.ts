import multer from "multer"
import { v4 as uuidv4 } from "uuid"

const imageUpload = multer({
  // limits: { fileSize: 500000 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images")
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname)
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true)
    } else {
      cb(new Error("ชนิดไฟล์ไม่ถูกต้อง"))
    }
  },
})

export default imageUpload
