import jwt from "jsonwebtoken"
import HttpError from "../utils/http-error"
import User from "../models/user"
import { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
dotenv.config()
const JWT_KEY = process.env.JWT_KEY || ""

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return next(HttpError.badRequest("Invalid token"))
  }
  const decodedToken = jwt.verify(token, JWT_KEY)

  if (typeof decodedToken === "string")
    return next(HttpError.badRequest("Invalid token"))

  const user = await User.findById(decodedToken.id)
  console.log(decodedToken)
  if (!user) {
    return next(HttpError.notFound("Account not found"))
  }
  if (user.status === "off") {
    return next(HttpError.notFound("Account not found"))
  }
  req.user = user
  next()
}
export const authRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(HttpError.forbidden("Access denied admin only"))
    }
    if (!roles.includes(req.user.role, 0)) {
      return next(HttpError.forbidden("Access denied admin only"))
    }
    next()
  }
}
