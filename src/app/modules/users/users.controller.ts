import { NextFunction, Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import httpStatus from 'http-status'
import { IUser } from './users.interface'
import { UserService } from './users.service'
import { paginationFields } from '../../../constants/pagination'


const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body
  const result = await UserService.createUser(userData)

  sendResponse<IUser | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users created successfully!',
    data: result,
  });
});

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields)

    const result = await UserService.getAllUser(paginationOptions)

    sendResponse<IUser[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Users retrieved successfully',
      meta: result.meta,
      data: result.data,
    })
    next()
  }
)

const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const result = await UserService.getSingleUser(id)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single User retrieved successfully !',
      data: result,
    })
    next()
  }
)

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await UserService.deleteUser(id)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully !',
    data: result,
  })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await UserService.updateUser(id, updatedData)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  })
})

export default {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
}
