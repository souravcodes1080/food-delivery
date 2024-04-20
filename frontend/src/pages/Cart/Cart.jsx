import React, { useContext } from "react";
import "./cart.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { DOMAIN } from "../../config";
function Cart() {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <>
      {getTotalCartAmount() > 0 ? (
        <>
          <div className="cart">
            <div className="cart-items">
              <div className="cart-items-title">
                <p>Items</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
              </div>
              <br />
              <hr />
              {food_list.map((item, index) => {
                if (cartItems[item._id] > 0) {
                  return (
                    <div key={index}>
                      <div className="cart-items-title cart-items-item">
                        <img
                          src={`${DOMAIN}/images/${item.image}`}
                          alt="product"
                        />
                        <p>{item.name}</p>
                        <p>${item.price}</p>
                        <p>{cartItems[item._id]}</p>
                        <p>${item.price * cartItems[item._id]}</p>
                        <p
                          onClick={() => removeFromCart(item._id)}
                          className="cross"
                        >
                          x
                        </p>
                      </div>
                      <hr />
                    </div>
                  );
                }
              })}
            </div>
            <div className="cart-bottom">
              <div className="cart-total">
                <h2>Cart Totals</h2>
                <div>
                  <div className="cart-total-details">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    <p>${2}</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                    <p>Total</p>
                    <p>${getTotalCartAmount() + 2}</p>
                  </div>
                </div>
                <button onClick={() => navigate("/order")}>
                  Proceed to Checkout
                </button>
              </div>
              <div className="cart-promocode">
                <div>
                  <p>If you have a promo code, enter it here.</p>
                  <div className="cart-promocode-input">
                    <input type="text" placeholder="WELCOME100" />
                    <button>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="empty-cart">
            <img src={assets.empty_cart} alt="" />
            <h2>Your cart is Empty.</h2>
            <p>
              Looks like you have not added anything to your cart. Go ahead and
              explore top categories.
            </p>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
