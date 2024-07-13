import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { DOMAIN } from "../../config";
function Cart() {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    promoApplied,
    applyPromoC,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const [promo, setPromo] = useState("");
  const [validPromo, setValidPromo] = useState("");

  useEffect(() => {
    if (promo === "TAYLOR25") {
      if (getTotalCartAmount() >= 150) {
        setValidPromo("Promo code applied successfully!");
        applyPromoC(true);
      } else {
        setValidPromo("Cart value must be more than ₹150 to avail this offer!");
        applyPromoC(false);
      }
    }
  }, [cartItems, getTotalCartAmount, applyPromoC]);

  const applyPromo = () => {
    if (promo === "TAYLOR25" && getTotalCartAmount() >= 150) {
      setValidPromo("Promo code applied sucessfully!");
      applyPromoC(true);
    } else if (promo === "TAYLOR25" && getTotalCartAmount() < 150) {
      setValidPromo("Cart value must be more than ₹150 to avail this offer!");
      applyPromoC(false);
    } else {
      setValidPromo("Invalid Promo code.");
      applyPromoC(false);
    }
  };
  useEffect(() => {
    applyPromo;
  }, [cartItems]);
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
                        <img src={item.image} alt="product" />
                        <p>{item.name}</p>
                        <p>₹{item.price}</p>
                        <p>{cartItems[item._id]}</p>
                        <p>₹{item.price * cartItems[item._id]}</p>
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
                    <p>₹{getTotalCartAmount()}</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                    <p>Delivery Fee + gst</p>
                    <p>₹{25}</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                    <p>Platform Fee</p>
                    <p>₹{5}</p>
                  </div>
                  {promoApplied && getTotalCartAmount() >= 150 && (
                    <>
                      <hr />
                      <div className="cart-total-details">
                        <p>Discount</p>
                        <p>- ₹{25}</p>
                      </div>
                    </>
                  )}
                  <hr />
                  {promoApplied && getTotalCartAmount() >= 150 ? (
                    <div className="cart-total-details">
                      <p>Total</p>
                      <p>₹{getTotalCartAmount() + 25 + 5 - 25}</p>
                    </div>
                  ) : (
                    <div className="cart-total-details">
                      <p>Total</p>
                      <p>₹{getTotalCartAmount() + 25 + 5}</p>
                    </div>
                  )}
                </div>
                <button onClick={() => navigate("/order")}>
                  Proceed to Checkout
                </button>
              </div>
              <div className="cart-promocode">
                <div>
                  <p>If you have a promo code, enter it here.</p>
                  <div className="cart-promocode-input">
                    <input
                      type="text"
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      placeholder="WELCOME100"
                    />
                    <button onClick={applyPromo}>Submit</button>
                  </div>
                  <p>{validPromo}</p>
                </div>
                {!promoApplied && <div className="promo-info">
                  <p>
                    O hi! Since you are here, delivery charges are on us! Apply
                    "TAYLOR25" code avail offer!
                    Cart value must be 150 or above*
                  </p>
                </div>}
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
