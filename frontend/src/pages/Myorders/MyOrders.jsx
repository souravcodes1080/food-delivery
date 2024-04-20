import React, { useContext, useEffect, useState } from "react";
import "./myOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { DOMAIN } from "../../config";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
function MyOrders() {
  const [data, setdata] = useState([]);
  // const { token } = useContext(StoreContext);
  const token = localStorage.getItem("Token");
  const fetchData = async () => {
    const response = await axios.post(
      `${DOMAIN}/api/order/userorder`,
      {},
      { headers: { token } }
    );

    setdata(response.data.data);
    console.log(response.data.data);
    if (response.data.success) {
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);
  return (
    <>
      {localStorage.getItem("Token") ? (
        <>
          {data.length === 0 ? <>
            <div className="my-order-signout">
            <img src={assets.my_order} alt="" />
            <p>Your Order history is empty.</p>
          </div>
          </> : <><div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
              {data.map((order, index) => {
                return (
                  <div key={index} className="my-orders-order">
                    <img src={assets.parcel_icon} alt="parcel" />

                    <p>
                      {order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                          return item.name + " x" + item.quantity;
                        } else {
                          return item.name + " x" + item.quantity + ", ";
                        }
                      })}
                    </p>
                    <p>${order.amount}.00</p>
                    <p>Items: {order.items.length}</p>
                    <p>
                      <span>&#x25cf;</span>
                      <b>{order.status}</b>
                    </p>
                    <button onClick={fetchData}>Track Order</button>
                  </div>
                );
              })}
            </div>
          </div></>}
          
        </>
      ) : (
        <>
          <div className="my-order-signout">
            <img src={assets.my_order} alt="" />
            <p>Please Sign in, to access your order history.</p>
          </div>
        </>
      )}
    </>
  );
}

export default MyOrders;
