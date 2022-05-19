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
      status: "success",
      message: "ลงทะเบียนสำเร็จ",
      data: {
        token,
        user: {
          id: newUser.id,
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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(HttpError.badRequest("กรุณาเพิ่ม Email และ Password"))
  }

  const { email, password } = req.body
  try {
    const user = await User.findOne({ email: email }, "+password")
    if (!user || user.status === "off") {
      return next(
        HttpError.unauthorized(
          "เข้าสู่ระบบไม่สำเร็จ อีเมลหรือรหัสผ่านไม่ถูกต้อง"
        )
      )
    }
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return next(
        HttpError.unauthorized(
          "เข้าสู่ระบบไม่สำเร็จ อีเมลหรือรหัสผ่านไม่ถูกต้อง"
        )
      )
    }

    const token = jwt.sign({ id: user.id }, JWT_KEY, {
      expiresIn: "7d",
    })
    return res.status(200).json({
      status: "success",
      message: "เข้าระบบสู่ระบบสำเร็จ",
      data: {
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          image: user.image,
          role: user.role,
        },
      },
    })
  } catch (error) {
    return next(error)
  }
}

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user.id)
    return res.status(200).json({
      status: "success",
      data: { user },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดึงข้อมูลได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}

export const updateMe = async (
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

  const { firstName, lastName, phoneNumber, address } = req.body
  try {
    const user = await User.findById(req.user.id, "-password -token")

    user.firstName = firstName
    user.lastName = lastName
    user.phoneNumber = phoneNumber
    user.address = address

    await user.save()
    res.status(200).json({
      status: "success",
      message: "อัพเดทข้อมูลผู้ใช้สำเร็จแล้ว",
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          image: user.image,
          role: user.role,
        },
      },
    })
  } catch (error) {
    console.log(error)
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}

export const updatePassword = async (
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

  const { password, oldPassword } = req.body
  try {
    const user = await User.findById(req.user.id).select("+password")
    const isValidPassword = await bcrypt.compare(oldPassword, user.password)
    if (!isValidPassword) {
      return next(HttpError.badRequest("รหัสผ่านเก่าไม่ถูกต้อง"))
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    user.password = hashedPassword
    await user.save()
    res.status(200).json({
      status: "success",
      message: "อัพเดทรหัสผ่านผู้ใช้สำเร็จแล้ว",
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}
