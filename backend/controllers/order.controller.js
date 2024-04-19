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
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.session.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${CLIENT_DOMAIN}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${CLIENT_DOMAIN}/verify?success=false&orderId=${newOrder._id}`,
    });

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

export { placeOrder };
