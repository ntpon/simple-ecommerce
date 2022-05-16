import { NextFunction, Request, Response } from "express"
import CartItem from "../models/cart-item"

export const getMyCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cartItems = await CartItem.find({ user: req.user.id }).populate([
    "product",
    "user",
  ])
  return res.status(200).json({ status: "success", data: { cartItems } })
}
