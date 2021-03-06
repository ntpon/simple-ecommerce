import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import CartItem from "../../models/cart-item"
import OrderStatus from "../../models/order-status"
import HttpError from "../../utils/http-error"
import { getPagination } from "../../utils/pagination"

export const getCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit, skip } = getPagination(req)
  try {
    const [cartItems, totalCartItems] = await Promise.all([
      CartItem.find()
        .populate(["product", "user"])
        .skip(skip)
        .limit(limit)
        .sort({ updatedAt: -1 }),
      CartItem.countDocuments(),
    ])

    const totalPage = Math.ceil(totalCartItems / limit)
    return res.status(200).json({
      data: {
        cartItems,
        totalCartItems,
        totalPage,
      },
    })
  } catch (error) {
    return next(
      HttpError.internal("ไม่สามารถดำเนินการได้สำเร็จ กรุณาลองอีกครั้ง")
    )
  }
}

export const getCartItemsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const cartItem = await CartItem.findById(id).populate(["product", "user"])
  if (!cartItem) {
    return next(HttpError.badRequest("ไม่พบข้อมูล"))
  }
  const orders = await OrderStatus.find({
    cartItem: cartItem,
  })

  return res.status(200).json({ status: "success", data: { cartItem, orders } })
}

export const updateStatusCartItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const { status } = req.body
  const sess = await mongoose.startSession()
  sess.startTransaction()
  try {
    const cartItem = await CartItem.findById(id)
    if (!cartItem) {
      return next(HttpError.badRequest("ไม่พบข้อมูล"))
    }

    cartItem.status = status
    await cartItem.save({ session: sess })

    await new OrderStatus({
      cartItem: cartItem,
      createBy: req.user.id,
      status: status,
    }).save({ session: sess })

    await sess.commitTransaction()

    return res
      .status(200)
      .json({ status: "success", message: "อัพเดทข้อมูลสำเร็จแล้ว" })
  } catch (error) {
    await sess.abortTransaction()
    return next(HttpError.internal("แก้ไขข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"))
  } finally {
    sess.endSession()
  }
}
