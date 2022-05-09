import HttpError from "./http-error"
import { Request, Response, NextFunction } from "express"

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    console.log("ERROR")
    return res.status(err.code).json({ code: err.code, error: err.message })
  }
  if (process.env.APP_MODE === "production") {
    return res.status(500).json({ code: 500, error: "Something went wrong" })
  } else {
    return res.status(500).json({ code: 500, error: err })
  }
}

export default errorHandler
