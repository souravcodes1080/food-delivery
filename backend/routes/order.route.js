import express from 'express'
import authMidddleware from '../middleware/auth.js'
import { placeOrder, verifyOrder } from '../controllers/order.controller.js'

const orderRouter = express.Router()

orderRouter.post('/placeorder',authMidddleware, placeOrder)
orderRouter.post('/verify', verifyOrder)

export default orderRouter