import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'

const createUserToDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user created Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = { createUserToDB }
