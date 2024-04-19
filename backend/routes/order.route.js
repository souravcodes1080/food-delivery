import express from 'express'
import authMidddleware from '../middleware/auth.js'
import { placeOrder } from '../controllers/order.controller.js'

const orderRouter = express.Router()

orderRouter.post('/placeorder',authMidddleware, placeOrder)

export default orderRouter