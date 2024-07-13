import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import Stripe from "stripe";
import { CLIENT_DOMAIN } from "../config/client.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order from frontend
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      cod: false
    });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    if (!req.body.promoApplied) {
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "Delivery Charges + gst",
          },
          unit_amount: 25 * 100,
        },
        quantity: 1,
      });
    }
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Platform Fees",
        },
        unit_amount: 5 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create(
      {
        line_items: line_items,
        mode: "payment",
        success_url: `${CLIENT_DOMAIN}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${CLIENT_DOMAIN}/verify?success=false&orderId=${newOrder._id}`,
      },
      { apiKey: process.env.STRIPE_SECRET_KEY }
    );
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // const paymentStatus = await session.retrieve.payment_status

    return res.json({
      success: true,
      session_url: session.url,
      message: "Your order has been placed.",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error placing order. Please try again later.",
    });
  }
};
const cod = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      cod: true
    });
    
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    
    const success_url=`${CLIENT_DOMAIN}/verify?success=ok&orderId=${newOrder._id}`
    return res.json({
      success: true,
      session_url: success_url,
      message: `Your order has been placed. Pay ₹${req.body.amount} via cash or online.`,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error placing order. Please try again later.",
    });
  }
};


const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Order Placed." });
    }
    else if(success == "ok"){
      await orderModel.findByIdAndUpdate(orderId, { payment: false });
      res.json({ success: true, message: "Order Placed via COD." });
    }
    else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed." });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Payment failed. Try again later." });
  }
};

//order list after confirmation
const userOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({
      $and: [{ userId: req.body.userId },{ $or: [{ payment: true }, {cod:true}]}],
    });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Order Fetching failed." });
  }
};

//admin panel order list
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ $or: [{ payment: true }, {cod:true}]} );
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Order Fetching failed." });
  }
};

//api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Order status updated." });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to update order. Try again later.",
    });
  }
};
export { placeOrder,cod, verifyOrder, userOrder, listOrders, updateStatus };
