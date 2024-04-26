import React, { useContext, useEffect, useState } from "react";
import "./placeOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { DOMAIN } from "../../config";
import { toast } from "react-toastify";
import axios from "axios";
function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    setLoading(true);
    let response = await axios.post(
      `${DOMAIN}/api/order/placeorder`,
      orderData,
      {
        headers: {
          token,
        },
      }
    );
    if (response.data.success) {
      const { session_url } = response.data;
      setLoading(false);
      window.location.replace(session_url)
      
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      toast.warn("Please login to continue.");
      navigate("/cart");
    }
  }, [token, navigate]);
  return (
    <>
      {getTotalCartAmount() > 0 ? (
        <>
          <form className="place-order" onSubmit={placeOrder}>
            <div className="place-order-left">
              <p className="title">Delivery Information</p>
              <div className="multi-fields">
                <input
                  required
                  name="firstName"
                  onChange={onChangeHandler}
                  value={data.firstName}
                  type="text"
                  placeholder="First Name"
                />
                <input
                  required
                  name="lastName"
                  onChange={onChangeHandler}
                  value={data.lastName}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <input
                required
                name="email"
                onChange={onChangeHandler}
                value={localStorage.getItem("Email")}
                type="email"
                placeholder="Email Address"
              />
              <input
                required
                name="street"
                onChange={onChangeHandler}
                value={data.street}
                type="text"
                placeholder="Street"
              />
              <div className="multi-fields">
                <input
                  required
                  name="city"
                  onChange={onChangeHandler}
                  value={data.city}
                  type="text"
                  placeholder="City"
                />
                <input
                  required
                  name="state"
                  onChange={onChangeHandler}
                  value={data.state}
                  type="text"
                  placeholder="State"
                />
              </div>
              <div className="multi-fields">
                <input
                  required
                  name="zipcode"
                  onChange={onChangeHandler}
                  value={data.zipcode}
                  type="zipcode"
                  placeholder="Zip Code"
                />
                <input
                  required
                  name="country"
                  onChange={onChangeHandler}
                  value={data.country}
                  type="text"
                  placeholder="Country"
                />
              </div>
              <input
                required
                name="phone"
                onChange={onChangeHandler}
                value={data.phone}
                type="number"
                placeholder="Phone Number"
              />
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
                <button type="submit">
                  {loading ? "Processing..." : "Proceed to Payment"}
                </button>
              </div>
            </div>
          </form>
          {/* <button class="upi-btn" onClick={upiPayment}>
            <img src={assets.upi} alt="upi" />
          </button> */}
        </>
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
