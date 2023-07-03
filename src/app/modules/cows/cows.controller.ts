import { NextFunction, Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import httpStatus from 'http-status'
import { ICow } from './cows.interface'
import { CowService } from './cows.service'
import { paginationFields } from '../../../constants/pagination'
import { cowFilterableFields } from './cows.constant'

const createCow = async (req: Request, res: Response) => {
  try {
    const { cow } = req.body
    const result = await CowService.createCow(cow)
    res.status(200).json({
      success: true,
      message: 'cow created',
      data: result,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'failed to create cow',
    })
  }
}

const getAllCows = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, cowFilterableFields)

    const paginationOptions = pick(req.query, paginationFields)

    const result = await CowService.getAllCow(filters, paginationOptions)

    sendResponse<ICow[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'cows retrieved successfully!',
      meta: result.meta,
      data: result.data,
    })
    next()
  }
)

const getSingleCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const result = await CowService.getSingleCow(id)

    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Cow retrieved successfully !',
      data: result,
    })
    next()
  }
)

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await CowService.deleteCow(id)

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow deleted successfully !',
    data: result,
  })
})

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await CowService.updateCow(id, updatedData)

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow updated successfully !',
    data: result,
  })
})

export default {
  createCow,
  getAllCows,
  getSingleCow,
  deleteCow,
  updateCow,
}
