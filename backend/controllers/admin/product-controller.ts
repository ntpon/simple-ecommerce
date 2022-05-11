import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"
import HttpError from "../../utils/http-error"
import { v2 as cloudinary } from "cloudinary"
import { strToSlug } from "../../utils/slug"
import Product from "../../models/product"

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find({ status: "on" })
    return res.status(200).json({
      data: products,
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)
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

export const createProduct = async (
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
  const { name, description, categories, authors, publisher, price, quantity } =
    req.body

  try {
    let slugProduct = name
    const product = await Product.count({ status: "on", name: name })

    if (product > 0) {
      slugProduct += "-" + product
    }

    const newProduct = new Product({
      name,
      description,
      slug: strToSlug(slugProduct),
      creator: req.user.id,
      publisher,
      price,
      quantity,
    })
    for (const category of categories) {
      newProduct.categories.push(category)
    }
    for (const author of authors) {
      newProduct.authors.push(author)
    }

    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] }
      // console.log(files.image)
      if (files.image && files.image.length > 0) {
        const result = await cloudinary.uploader.upload(files.image[0].path, {
          folder: process.env.FOLDER_NAME + "/product",
        })
        newProduct.image = {
          public_id: result.public_id,
          url: result.secure_url,
        }
      }
      if (files.images && files.images.length > 0) {
        for (const file of files.images) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: process.env.FOLDER_NAME + "/products",
          })
          newProduct.images.push({
            public_id: result.public_id,
            url: result.secure_url,
          })
        }
      }
    }

    await newProduct.save()
    res.status(201).json({ status: "success", message: "สร้างข้อมูลสำเร็จ" })
  } catch (error) {
    console.log(error)
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}

export const updateProduct = async (
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
  const {
    name,
    description,
    categories,
    authors,
    publisher,
    price,
    quantity,
    currentImages,
  } = req.body
  const currentImagesArray = currentImages as string[]
  // console.log(currentImages)
  // console.log(currentImagesArray)

  try {
    const product = await Product.findById(id)
    if (!product || product.status === "off") {
      return next(HttpError.notFound("ไม่พบข้อมูล"))
    }

    product.name = name
    product.description = description
    product.creator = req.user.id
    product.price = price
    product.quantity = quantity

    // product.images = product.images.filter(
    //   (image: { id: string; public_id: string; url: string }) => {
    //     return imagesCurrentArray.includes(image.id)
    //   }
    // )
    product.publisher = publisher

    product.images = []
    product.categories = []
    product.authors = []
    if (currentImagesArray && currentImagesArray.length > 0) {
      for (const imageItem of currentImagesArray) {
        product.categories.push(imageItem)
      }
    }

    for (const category of categories) {
      product.categories.push(category)
    }
    for (const author of authors) {
      product.authors.push(author)
    }

    if (name !== product.name) {
      let slugProduct = strToSlug(name)

      const numberSlug = await Product.count({
        slug: slugProduct,
        status: "on",
        _id: {
          $ne: product.id,
        },
      })
      if (numberSlug > 0) {
        slugProduct += slugProduct + "-" + numberSlug + 1
      }
      product.slug = slugProduct
    }

    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] }
      if (files.image && files.image.length > 0) {
        const result = await cloudinary.uploader.upload(files.image[0].path, {
          folder: process.env.FOLDER_NAME + "/product",
        })
        product.image = {
          public_id: result.public_id,
          url: result.secure_url,
        }
      }

      if (files.images && files.images.length > 0) {
        for (const file of files.images) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: process.env.FOLDER_NAME + "/products",
          })
          product.images.push({
            public_id: result.public_id,
            url: result.secure_url,
          })
        }
      }
    }

    await product.save()
    res.status(201).json({ status: "success", message: "แก้ไขข้อมูลสำเร็จ" })
  } catch (error) {
    console.log(error)
    return next(HttpError.internal("แก้ไขข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"))
  }
}

export const deleteProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)
    if (!product || product.status === "off") {
      return next(HttpError.badRequest("ไม่มีข้อมูลอยู่ในระบบ"))
    }

    product.status = "off"
    product.save()

    return res.status(200).json({
      status: "success",
      message: "ข้อมูลถูกลบเรียบร้อย",
    })
  } catch (error) {
    return next(HttpError.internal("ลบข้อมูลไม่สำเร็จ กรุณาตรวจสอบอีกครั้ง"))
  }
}
