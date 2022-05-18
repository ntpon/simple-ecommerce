import { NextFunction, Request, Response } from "express"
import HttpError from "../utils/http-error"
import Product from "../models/product"
import Cart from "../models/cart"
import CartItem from "../models/cart-item"
import Order from "../models/order"
import OrderStatus from "../models/order-status"
import mongoose from "mongoose"

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user.id
  const products = req.body.products

  if (!products) {
    return next(HttpError.badRequest("กรุณาเลือกสินค้าก่อนทำรายการ"))
  }

  const uniqueValues = new Set(products.map((p: any) => p.id))

  if (uniqueValues.size < products.length) {
    return next(
      HttpError.badRequest("รายการสินค้าไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง")
    )
  }

  let productLists = []
  let decreaseProductList = []

  const sess = await mongoose.startSession()
  try {
    sess.startTransaction()
    for (const product of products) {
      if (product.quantity >= 0) {
        // console.log(product)
        productLists.push(
          Product.findOne({
            _id: product.id,
            status: "on",
            isActive: true,
            quantity: {
              $gte: product.quantity,
            },
          })
        )
        decreaseProductList.push(
          Product.findOneAndUpdate(
            {
              _id: product.id,
              status: "on",
              isActive: true,
              quantity: {
                $gte: product.quantity,
              },
            },
            {
              $inc: { quantity: -product.quantity },
            },
            { new: true, session: sess }
          )
        )
      } else {
        return next(
          HttpError.badRequest("รายการสินค้าไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง")
        )
      }
    }

    const productQuery = await Promise.all(productLists)

    if (!productQuery) {
      return next(
        HttpError.badRequest("รายการสินค้าไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง")
      )
    }
    let createCartItemLists = []
    let createOrderStatusLists = []
    let total = 0

    const newCart = new Cart({
      user: user,
    })

    for (const product of productQuery) {
      if (!product) {
        // console.log(productQuery)
        return next(
          HttpError.badRequest("รายการสินค้าไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง")
        )
      }
      const productFromUser = products.find((p: any) => p.id === product.id)

      //   คำนวณราคา
      total += product.price * productFromUser.quantity

      let cartItem = new CartItem({
        product: product.id,
        quantity: productFromUser.quantity,
        purchasePrice: product.price,
        totalPrice: product.price * productFromUser.quantity,
        cart: newCart,
        user: user,
      })

      createOrderStatusLists.push(
        new OrderStatus({
          cartItem: cartItem,
          createBy: user,
        }).save({ session: sess })
      )

      createCartItemLists.push(cartItem.save({ session: sess }))
    }

    const createCartItemQuery = await Promise.all(createCartItemLists)

    // const newCart = new Cart({
    //   user: user,
    //   products: createCartItemQuery,
    // })
    newCart.products = createCartItemQuery
    const cart = await newCart.save({ session: sess })

    const createOrderStatusListsQuery = await Promise.all(
      createOrderStatusLists
    )

    await Promise.all([
      ...decreaseProductList,
      new Order({
        cart: cart,
        orderStatus: createOrderStatusListsQuery,
        total: total,
      }).save({ session: sess }),
    ])

    await sess.commitTransaction()

    res.status(200).json({ status: "success", message: "สั่งซื้อสินค้าสำเร็จ" })
  } catch (error) {
    // console.log(error)
    await sess.abortTransaction()
    return next(HttpError.internal("ทำรายการไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"))
  } finally {
    sess.endSession()
  }
}
