import HttpError from "./http-error"
import { Request, Response, NextFunction } from "express"
const fs = require("fs")
const path = require("path")
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.file) {
    fs.unlink(req.file.path, (error: Error) => {})
  }
  if (err instanceof HttpError) {
    return res.status(err.code).json({ code: err.code, error: err.message })
  }

  if (process.env.APP_MODE === "production") {
    return res.status(500).json({ code: 500, error: "Something went wrong" })
  } else {
    return res.status(500).json({ code: 500, error: err })
  }
}

export default errorHandler
