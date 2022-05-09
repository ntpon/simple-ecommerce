import { Request, Response } from "express"
import User from "../../models/user"

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find()
  return res.status(200).json({
    data: users,
  })
}
