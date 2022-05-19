import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"
import Category from "../../models/category"
import HttpError from "../../utils/http-error"
import { getPagination } from "../../utils/pagination"
import { strToSlug } from "../../utils/slug"

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit, skip } = getPagination(req)
  try {
    const [categories, totalCategory] = await Promise.all([
      Category.find({ status: "on" }).skip(skip).limit(limit),
      Category.countDocuments({ status: "on" }),
    ])

    const totalPage = Math.ceil(totalCategory / limit)
    return res.status(200).json({
      data: {
        categories,
        totalCategory,
        totalPage,
      },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}
export const getCategoryAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find({ status: "on" })

    return res.status(200).json({
      data: {
        categories,
      },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}
export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const category = await Category.findById(id)

    if (!category || category.status === "off") {
      return next(HttpError.notFound("ไม่พบข้อมูล"))
    }
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}

export const createCategory = async (
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
    const category = await Category.findOne({ status: "on", name: name })
    if (category) {
      return next(
        HttpError.badRequest("ชื่อประเภทสินค้าซ้ำ กรุณาเปลี่ยนชื่อประเภทสินค้า")
      )
    }
    const newCategory = new Category({
      name,
      description,
      slug: strToSlug(name),
      creator: req.user.id,
    })
    await newCategory.save()
    res.status(201).json({ status: "success", message: "สร้างข้อมูลสำเร็จ" })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}

export const updateCategory = async (
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
    const category = await Category.findById(id)
    if (!category || category.status === "off") {
      return next(HttpError.notFound("ไม่พบประเภทสินค้า"))
    }

    const isNameCategoryDuplicate = await Category.findOne({
      name: name,
      status: "on",
      _id: {
        $ne: category.id,
      },
    })

    if (isNameCategoryDuplicate) {
      return next(
        HttpError.badRequest("ชื่อประเภทสินค้าซ้ำ กรุณาเปลี่ยนชื่อประเภทสินค้า")
      )
    }

    category.name = name
    category.description = description
    category.slug = strToSlug(name)
    category.creator = req.user.id

    await category.save()
    res.status(201).json({ status: "success", message: "แก้ไขข้อมูลสำเร็จ" })
  } catch (error) {
    return next(HttpError.internal("แก้ไขข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"))
  }
}

export const deleteCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const category = await Category.findById(id)
    if (!category || category.status === "off") {
      return next(HttpError.badRequest("ไม่มีข้อมูลอยู่ในระบบ"))
    }

    category.status = "off"
    category.save()

    return res.status(200).json({
      status: "success",
      message: "ข้อมูลถูกลบเรียบร้อย",
    })
  } catch (error) {
    return next(HttpError.internal("ลบข้อมูลไม่สำเร็จ กรุณาตรวจสอบอีกครั้ง"))
  }
}
