import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"
import HttpError from "../../utils/http-error"
import bcrypt from "bcryptjs"
import { v2 as cloudinary } from "cloudinary"
import { strToSlug } from "../../utils/slug"
import Author from "../../models/author"
import { getPagination } from "../../utils/pagination"

export const getAuthorsAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authors = await Author.find({ status: "on" })
    return res.status(200).json({
      data: {
        authors,
      },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}

export const getAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit, skip } = getPagination(req)
  try {
    const [authors, totalAuthor] = await Promise.all([
      Author.find({ status: "on" }).skip(skip).limit(limit),
      Author.countDocuments({ status: "on" }),
    ])

    const totalPage = Math.ceil(totalAuthor / limit)
    return res.status(200).json({
      data: {
        authors,
        totalAuthor,
        totalPage,
      },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}

export const getAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const author = await Author.findById(id)
    if (!author || author.status === "off") {
      return next(HttpError.notFound("ไม่พบข้อมูล"))
    }

    return res.status(200).json({
      status: "success",
      data: {
        author,
      },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}

export const createAuthor = async (
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
  const { name, description } = req.body
  try {
    const author = await Author.findOne({ status: "on", name: name })
    if (author) {
      return next(
        HttpError.badRequest("ชื่อผู้เขียนซ้ำ กรุณาเปลี่ยนชื่อผู้เขียน")
      )
    }
    const newAuthor = new Author({
      name,
      description,
      slug: strToSlug(name),
      creator: req.user.id,
    })

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: process.env.FOLDER_NAME + "/author",
        width: 300,
        crop: "scale",
      })
      newAuthor.image = {
        public_id: result.public_id,
        url: result.secure_url,
      }
    }

    await newAuthor.save()
    res.status(201).json({ status: "success", message: "สร้างข้อมูลสำเร็จ" })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}

export const updateAuthor = async (
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
  const { name, description } = req.body
  try {
    const author = await Author.findById(id)
    if (!author || author.status === "off") {
      return next(HttpError.notFound("ไม่พบข้อมูล"))
    }

    const isNameAuthorDuplicate = await Author.findOne({
      name: name,
      status: "on",
      _id: {
        $ne: author.id,
      },
    })
    if (isNameAuthorDuplicate) {
      return next(
        HttpError.badRequest("ชื่อผู้เขียนซ้ำ กรุณาเปลี่ยนชื่อผู้เขียน")
      )
    }

    author.name = name
    author.description = description
    author.slug = strToSlug(name)
    author.creator = req.user.id
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: process.env.FOLDER_NAME + "/image",
        width: 300,
        crop: "scale",
      })
      author.image = { public_id: result.public_id, url: result.secure_url }
    }
    await author.save()
    res.status(201).json({ status: "success", message: "แก้ไขข้อมูลสำเร็จ" })
  } catch (error) {
    return next(HttpError.internal("แก้ไขข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"))
  }
}

export const deleteAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const author = await Author.findById(id)
    if (!author || author.status === "off") {
      return next(HttpError.badRequest("ไม่มีข้อมูลอยู่ในระบบ"))
    }

    author.status = "off"
    author.save()

    return res.status(200).json({
      status: "success",
      message: "ข้อมูลถูกลบเรียบร้อย",
    })
  } catch (error) {
    return next(HttpError.internal("ลบข้อมูลไม่สำเร็จ กรุณาตรวจสอบอีกครั้ง"))
  }
}
