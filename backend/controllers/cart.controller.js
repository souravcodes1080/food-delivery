import userModel from "../models/user.model.js";

//add items to cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added To Cart." });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error adding to cart. Please try again later.",
    });
  }
};

//remove items from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    } else {
      return res.json({ success: false, message: "Cart empty." });
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from Cart." });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error removing from cart. Please try again later.",
    });
  }
};

//fetchCartData
const getCartData = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData
    res.json({success: true, cartData})
  } catch (error) {
    console.log(error);
    return res.json({
        success: false,
        message: "Error retreiving cart. Please try again later.",
      });
  }
};
export { addToCart, removeFromCart, getCartData };
