import { NextFunction, Request, Response } from "express"
import Category from "../models/category"
import Product from "../models/product"
import HttpError from "../utils/http-error"

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categories = await Category.find({ status: "on" })
  return res.status(200).json({
    data: {
      categories,
    },
  })
}

export const getProductsByCategorySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { slug } = req.params
  try {
    // const products = await Product.find({
    //   status: "on",
    //   "categories.slug": slug,
    // }).populate(["categories", "authors", "publisher"])
    const products = await Product.aggregate([
      {
        $match: {
          status: "on",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $match: {
          "categories.slug": slug,
        },
      },
    ])
    return res.status(200).json({
      status: "success",
      data: {
        products,
      },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}
