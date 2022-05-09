import { NextFunction, Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import HttpError from "../utils/http-error"
import User from "../models/user"
import { validationResult } from "express-validator"
import dotenv from "dotenv"
dotenv.config()

const JWT_KEY = process.env.JWT_KEY || ""

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      HttpError.badRequest("ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบข้อมูลอีกครั้ง")
    )
  }

  const { email, password, firstName, lastName, phoneNumber } = req.body

  // if (!email || !password || !firstName || !lastName || phoneNumber) {
  //   return next(
  //     HttpError.badRequest("ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบข้อมูลอีกครั้ง")
  //   )
  // }
  try {
    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
      return next(
        HttpError.badRequest(
          "อีเมลนี้ถูกลงทะเบียนโดยผู้ใช้รายอื่นแล้ว กรุณาเปลี่ยนอีเมลใหม่"
        )
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    })

    await newUser.save()
    const token = jwt.sign({ id: newUser.id }, JWT_KEY, {
      expiresIn: "7d",
    })
    // const { password: remove, ...userData } = newUser

    return res.status(200).json({
      message: "ลงทะเบียนสำเร็จ",
      data: {
        token,
        user: {
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          image: newUser.image,
          role: newUser.role,
        },
      },
    })
  } catch (error) {
    return next(error)
  }
}
