import { NextFunction, Request, Response } from "express"
import Category from "../models/category"
import Product from "../models/product"
import HttpError from "../utils/http-error"
import { getPagination } from "../utils/pagination"

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

  const { page, limit, skip } = getPagination(req)
  try {
    // const products = await Product.find({
    //   status: "on",
    //   "categories.slug": slug,
    // }).populate(["categories", "authors", "publisher"])
    const [products, totalProduct] = await Promise.all([
      Product.aggregate([
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
        .skip(skip)
        .limit(limit),
      Product.aggregate([
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
      ]).count("id"),
    ])
    let total = 0
    let totalPage = 0
    if (totalProduct.length > 0) {
      total = totalProduct[0].id || 1
      totalPage = Math.ceil(total / limit)
    }

    return res.status(200).json({
      status: "success",
      data: {
        products,
        totalProduct: total,
        totalPage,
      },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}
