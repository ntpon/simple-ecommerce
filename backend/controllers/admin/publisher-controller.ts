import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"
import Publisher from "../../models/publisher"
import HttpError from "../../utils/http-error"
import { getPagination } from "../../utils/pagination"
import { strToSlug } from "../../utils/slug"

export const getPublishersAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const publishers = await Publisher.find({ status: "on" })
  try {
    return res.status(200).json({
      data: {
        publishers,
      },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}
export const getPublishers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit, skip } = getPagination(req)

  try {
    const [publishers, totalPublisher] = await Promise.all([
      Publisher.find({ status: "on" }).skip(skip).limit(limit),
      Publisher.countDocuments({ status: "on" }),
    ])

    const totalPage = Math.ceil(totalPublisher / limit)
    return res.status(200).json({
      data: {
        publishers,
        totalPublisher,
        totalPage,
      },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}
export const getPublisherById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const publisher = await Publisher.findById(id)

    if (!publisher || publisher.status === "off") {
      return next(HttpError.notFound("ไม่พบข้อมูล"))
    }
    res.status(200).json({
      status: "success",
      data: {
        publisher,
      },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}

export const createPublisher = async (
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
    const publisher = await Publisher.findOne({ status: "on", name: name })
    if (publisher) {
      return next(
        HttpError.badRequest("ชื่อสำนักพิมพ์ซ้ำ กรุณาเปลี่ยนชื่อสำนักพิมพ์")
      )
    }
    const newPublisher = new Publisher({
      name,
      description,
      slug: strToSlug(name),
      creator: req.user.id,
    })
    await newPublisher.save()
    res.status(201).json({ status: "success", message: "สร้างข้อมูลสำเร็จ" })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}

export const updatePublisher = async (
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
    const publisher = await Publisher.findById(id)
    if (!publisher || publisher.status === "off") {
      return next(HttpError.notFound("ไม่พบสำนักพิมพ์"))
    }

    const isNamePublisherDuplicate = await Publisher.findOne({
      name: name,
      status: "on",
      _id: {
        $ne: publisher.id,
      },
    })

    if (isNamePublisherDuplicate) {
      return next(
        HttpError.badRequest("ชื่อสำนักพิมพ์ซ้ำ กรุณาเปลี่ยนชื่อสำนักพิมพ์")
      )
    }

    publisher.name = name
    publisher.description = description
    publisher.slug = strToSlug(name)
    publisher.creator = req.user.id

    await publisher.save()
    res.status(201).json({ status: "success", message: "แก้ไขข้อมูลสำเร็จ" })
  } catch (error) {
    return next(HttpError.internal("แก้ไขข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"))
  }
}

export const deletePublisherById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const publisher = await Publisher.findById(id)
    if (!publisher || publisher.status === "off") {
      return next(HttpError.badRequest("ไม่มีข้อมูลอยู่ในระบบ"))
    }

    publisher.status = "off"
    publisher.save()

    return res.status(200).json({
      status: "success",
      message: "ข้อมูลถูกลบเรียบร้อย",
    })
  } catch (error) {
    return next(HttpError.internal("ลบข้อมูลไม่สำเร็จ กรุณาตรวจสอบอีกครั้ง"))
  }
}
