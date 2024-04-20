import express from 'express'
import authMidddleware from '../middleware/auth.js'
import { listOrders, placeOrder, userOrder, verifyOrder } from '../controllers/order.controller.js'

const orderRouter = express.Router()

orderRouter.post('/placeorder',authMidddleware, placeOrder)
orderRouter.post('/verify', verifyOrder)
orderRouter.post('/userorder', authMidddleware,userOrder)
orderRouter.get('/list', listOrders)

export default orderRouter