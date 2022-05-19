import { NextFunction, Request, Response } from "express"
import Category from "../models/category"
import Product from "../models/product"
import HttpError from "../utils/http-error"
import { getPagination } from "../utils/pagination"
export const getProductForHomeIndex = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [recommendProducts, newProducts, sciProducts, sellProducts] =
    await Promise.all([
      Product.find({
        isRecommend: true,
        // quantity: {
        //   $gte: 0,
        // },
        status: "on",
      }).limit(5),
      Product.find({ status: "on" }).sort({ createdAt: -1 }).limit(5),
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
            "categories.slug": "หนังสือวิทยาศาสตร์",
          },
        },
      ]).limit(5),
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
            "categories.slug": "หนังสือขายดี",
          },
        },
      ]).limit(5),
    ])

  return res.status(200).json({
    data: {
      recommendProducts,
      newProducts,
      sciProducts,
      sellProducts,
    },
  })
}

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit, skip } = getPagination(req)
  // const products = await Product.find({ status: "on" }).skip(skip).limit(limit)
  // const totalProduct = await Product.countDocuments({ status: "on" })
  try {
    const [products, totalProduct] = await Promise.all([
      Product.find({ status: "on" })
        .skip(skip)
        .limit(limit)
        .sort({ updatedAt: -1 }),
      Product.countDocuments({ status: "on" }),
    ])

    const totalPage = Math.ceil(totalProduct / limit)
    return res.status(200).json({
      data: {
        products,
        totalProduct,
        totalPage,
      },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}

export const getProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { slug } = req.params
  try {
    const product = await Product.findOne({
      status: "on",
      slug: slug,
    }).populate(["categories", "authors", "publisher"])

    if (!product || product.status === "off") {
      return next(HttpError.notFound("ไม่พบข้อมูล"))
    }

    return res.status(200).json({
      status: "success",
      data: {
        product,
      },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}

export const getProductFromSearch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { value } = req.query
  if (!value) {
    return next(HttpError.badRequest("ไม่พบผลการค้นหา กรุณาเพิ่มข้อความค้นหา"))
  }
  try {
    const search = await Product.aggregate([
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
        $lookup: {
          from: "authors",
          localField: "authors",
          foreignField: "_id",
          as: "authors",
        },
      },
      {
        $lookup: {
          from: "publisher",
          localField: "publisher",
          foreignField: "_id",
          as: "publisher",
        },
      },
      {
        $match: {
          $or: [
            {
              description: new RegExp(value.toString()),
            },
            { name: new RegExp(value.toString()) },
            {
              "categories.name": new RegExp(value.toString()),
            },
            {
              "authors.name": new RegExp(value.toString()),
            },
            {
              "publisher.name": new RegExp(value.toString()),
            },
          ],
        },
      },
    ]).limit(10)

    res.status(200).json({
      status: "success",
      data: {
        products: search,
      },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}
