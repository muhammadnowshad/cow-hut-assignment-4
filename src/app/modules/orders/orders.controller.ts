import { NextFunction, Request, Response } from 'express'
import { OrderService } from './orders.service'
import httpStatus from 'http-status'

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cow, buyer } = req.body
    const order = await OrderService.createOrder({ cow, buyer })
    res.status(httpStatus.CREATED).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    })
  } catch (error) {
    next(error)
  }
}

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderService.getAllOrders()
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: orders,
    })
  } catch (error) {
    next(error)
  }
}

export default {
  createOrder,
  getAllOrders,
}
