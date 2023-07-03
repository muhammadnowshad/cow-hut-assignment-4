import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { IAdmin } from './admin.interface'
import { AdminService } from './admin.service'
import { NextFunction, Request, Response } from 'express'


// const createAdmin = async (req: Request, res: Response) => {
//   try {
//     const { ...admin } = req.body
//     const result = await AdminService.createAdmin(admin)
//     res.status(200).json({
//       success: true,
//       statusCode: 200,
//       message: 'Admin created successfully',
//       data: result,
//     })
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: 'Failed to created Admin',
//     })
//   }
// }

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...adminData } = req.body
  const result = await AdminService.createAdmin(
    adminData
  )

  sendResponse<IAdmin>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin created successfully!',
    data: result,
  })
})

const getAllAdmins = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields)

    const result = await AdminService.getAllAdmin(paginationOptions)

    sendResponse<IAdmin[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admins retrieved successfully',
      // meta: result.meta,
      data: result.data,
    })
    next()
  }
)

export default {
  createAdmin,
  getAllAdmins,
}
