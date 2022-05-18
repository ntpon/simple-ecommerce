import express, { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"
import helmet from "helmet"
import cors from "cors"
import errorHandler from "./utils/handler-error"

// Client
import authRoute from "./routes/auth-route"
import cartRoute from "./routes/cart-route"
import orderRoute from "./routes/order-route"
import cartItemRoute from "./routes/cart-item-route"
import categoryRoute from "./routes/category-route"
import productRoute from "./routes/product-route"

// Admin
import userAdminRoute from "./routes/admin/user-route"
import categoryAdminRoute from "./routes/admin/category-route"
import authorAdminRoute from "./routes/admin/author-route"
import publisherAdminRoute from "./routes/admin/publisher-route"
import productAdminRoute from "./routes/admin/product-route"
import cartItemAdminRoute from "./routes/admin/cart-item-route"

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
app.use("/api/v1/cart", cartRoute)
app.use("/api/v1/cart-item", cartItemRoute)
app.use("/api/v1/order", orderRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/category", categoryRoute)

app.use("/api/v1/admin/user", userAdminRoute)
app.use("/api/v1/admin/category", categoryAdminRoute)
app.use("/api/v1/admin/author", authorAdminRoute)
app.use("/api/v1/admin/publisher", publisherAdminRoute)
app.use("/api/v1/admin/product", productAdminRoute)
app.use("/api/v1/admin/cart-item", cartItemAdminRoute)

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
