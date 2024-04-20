import express from 'express'
import authMidddleware from '../middleware/auth.js'
import { placeOrder, userOrder, verifyOrder } from '../controllers/order.controller.js'

const orderRouter = express.Router()

orderRouter.post('/placeorder',authMidddleware, placeOrder)
orderRouter.post('/verify', verifyOrder)
orderRouter.post('/userorder', authMidddleware,userOrder)

export default orderRouter