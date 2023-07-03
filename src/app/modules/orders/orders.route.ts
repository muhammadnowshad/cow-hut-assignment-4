import express from 'express'
import ordersController from './orders.controller'

const router = express.Router()

router.post('/create-order', ordersController.createOrder)
router.get('/', ordersController.getAllOrders)

export const OrdersRoutes = router
