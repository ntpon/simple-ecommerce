import { NextFunction, Request, Response } from "express"
import CartItem from "../models/cart-item"
import Cart from "../models/cart-item"
import Order from "../models/order"

export const getMyOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const carts = await Cart.aggregate([
  //   {
  //     $lookup: {
  //       from: "CartItem",
  //       localField: "products",
  //       foreignField: "_id",
  //       as: "category",
  //     },
  //   },
  // ])
  // return res.status(200).json({
  //   carts,
  // })
}
