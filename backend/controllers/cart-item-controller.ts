import { NextFunction, Request, Response } from "express"
import CartItem from "../models/cart-item"
import { getPagination } from "../utils/pagination"

export const getMyCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit, skip } = getPagination(req)

  try {
    const [cartItems, totalCartItem] = await Promise.all([
      CartItem.find({ user: req.user.id })
        .populate(["product", "user"])
        .skip(skip)
        .limit(limit)
        .sort({ updatedAt: -1 }),
      CartItem.countDocuments({ user: req.user.id }),
    ])
    const totalPage = Math.ceil(totalCartItem / limit)

    return res.status(200).json({
      status: "success",
      data: { cartItems, totalCartItem, totalPage },
    })
  } catch (error) {}
}
