import express, { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"
import helmet from "helmet"
import cors from "cors"
import errorHandler from "./utils/handler-error"
import authRoute from "./routes/auth-route"
// Admin
import userRoute from "./routes/admin/user-route"
import HttpError from "./utils/http-error"

dotenv.config()
const app = express()
app.use(helmet())

app.use(express.json({ limit: "30mb" }))
app.use(express.urlencoded({ limit: "30mb" }))

app.use(cors())

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use("/api/v1/auth", authRoute)

app.use("/api/v1/admin/user", userRoute)

app.use((req: Request, res: Response, next: NextFunction) => {
  return next(HttpError.notFound("Could not find this route."))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log("START SERVER ON " + PORT)
})

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_SERVER_NAME}/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("DB START")
  })
  .catch((err) => {
    console.log("DB ERROR")
    console.log(err)
  })
