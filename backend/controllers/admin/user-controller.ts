import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"
import User from "../../models/user"
import HttpError from "../../utils/http-error"
import bcrypt from "bcryptjs"
import { v2 as cloudinary } from "cloudinary"
import { getPagination } from "../../utils/pagination"

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit, skip } = getPagination(req)

  try {
    const [users, totalUser] = await Promise.all([
      User.find({ status: "on" }).select("-password").skip(skip).limit(limit),
      User.countDocuments({ status: "on" }),
    ])

    const totalPage = Math.ceil(totalUser / limit)
    return res.status(200).json({
      data: {
        users,
        totalUser,
        totalPage,
      },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const user = await User.findById(id, "-password -token")
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}

export const createUser = async (
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
  const { firstName, lastName, email, password, address, phoneNumber } =
    req.body
  try {
    const user = await User.findOne({ status: "on", email: email })
    if (user) {
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
      address,
      phoneNumber,
      password: hashedPassword,
    })
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: process.env.FOLDER_NAME + "/avatars",
        width: 300,
        crop: "scale",
      })
      newUser.avatar = { public_id: result.public_id, url: result.secure_url }
    }
    await newUser.save()
    res.status(201).json({ status: "success", message: "สร้างผู้ใช้สำเร็จ" })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}

export const updateUser = async (
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
  const { id } = req.params
  const { firstName, lastName, email, phoneNumber, address } = req.body
  try {
    const user = await User.findById(id)
    if (!user) {
      return next(HttpError.notFound("ไม่พบข้อมูลผู้ใช้"))
    }
    if (user.email != email) {
      const isEmailDuplicate = await User.findOne({
        email: email,
        status: "on",
        id: {
          $ne: user.id,
        },
      })

      if (isEmailDuplicate) {
        return next(
          HttpError.badRequest(
            "อีเมลนี้ถูกลงทะเบียนโดยผู้ใช้รายอื่นแล้ว กรุณาเปลี่ยนอีเมลใหม่"
          )
        )
      }
    }

    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.phoneNumber = phoneNumber
    user.address = address

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: process.env.FOLDER_NAME + "/avatars",
        width: 300,
        crop: "scale",
      })
      user.avatar = { public_id: result.public_id, url: result.secure_url }
    }

    await user.save()
    res
      .status(201)
      .json({ status: "success", message: "แก้ไขข้อมูลผู้ใช้สำเร็จ" })
  } catch (error) {
    return next(
      HttpError.internal("แก้ไขข้อมูลผู้ใช้ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง")
    )
  }
}

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    if (!user || user.status === "off") {
      return next(HttpError.badRequest("ไม่มีข้อมูลอยู่ในระบบ"))
    }

    user.status = "off"
    user.save()

    return res.status(200).json({
      status: "success",
      message: "ข้อมูลถูกลบเรียบร้อย",
    })
  } catch (error) {
    return next(HttpError.internal("ลบข้อมูลไม่สำเร็จ กรุณาตรวจสอบอีกครั้ง"))
  }
}
