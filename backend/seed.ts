import mongoose from "mongoose"
import dotenv from "dotenv"
import { readFile } from "fs/promises"

dotenv.config()

// import connectDB from "./db/connect.js"
// import Job from "./models/Job.js"

const start = async () => {
  try {
    mongoose
      .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_SERVER_NAME}/${process.env.DB_NAME}?retryWrites=true&w=majority`
      )
      .then(() => {
        console.log("Content DB")
        console.log("Success!!!")
        process.exit(0)
      })
      .catch(() => {
        console.log("ERROR")
      })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
