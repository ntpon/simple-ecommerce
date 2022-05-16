import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import CartItem from "../../models/cart-item"
import OrderStatus from "../../models/order-status"
import HttpError from "../../utils/http-error"

export const getCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cartItems = await CartItem.find().populate(["product", "user"])
  return res.status(200).json({ status: "success", data: { cartItems } })
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
