import express from "express";
import authMidddleware from "../middleware/auth.js";
import {
  addToCart,
  getCartData,
  removeFromCart,
} from "../controllers/cart.controller.js";
const cartRouter = express.Router();

cartRouter.post("/add", authMidddleware, addToCart);
cartRouter.post("/remove",authMidddleware, removeFromCart);
cartRouter.post("/get",authMidddleware, getCartData);

export default cartRouter;
