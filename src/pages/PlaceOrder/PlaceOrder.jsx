import React, { useContext } from "react";
import "./placeOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
function PlaceOrder() {
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <>
      {getTotalCartAmount() > 0 ? (
        <form className="place-order">
          <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
            </div>
            <input type="email" placeholder="Email Address" />
            <input type="text" placeholder="Street" />
            <div className="multi-fields">
              <input type="text" placeholder="City" />
              <input type="text" placeholder="State" />
            </div>
            <div className="multi-fields">
              <input type="number" placeholder="Zip Code" />
              <input type="text" placeholder="Country" />
            </div>
            <input type="number" placeholder="Phone Number" />
          </div>
          <div className="place-order-right">
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
                Proceed to Payment
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="empty-cart">
            <img src={assets.empty_cart} alt="empty cart" />
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

export default PlaceOrder;
