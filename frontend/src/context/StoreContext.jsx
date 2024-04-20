import { createContext, useEffect, useState } from "react";
import { DOMAIN } from "../config";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [food_list, setfood_list] = useState([]);
  const [loading, setLoading] = useState(false)
  const fetchFoodList = async () => {
    setLoading(true)
    const response = await axios.get(`${DOMAIN}/api/food/list`);
    if (response.data.success) {
      setfood_list(response.data.data);
    }
    setLoading(false)
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      `${DOMAIN}/api/cart/get`,
      {},
      {
        headers: { token },
      }
    );
    setCartItems(response.data.cartData);
  };
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      const response = await axios.post(
        `${DOMAIN}/api/cart/add`,
        { itemId },
        {
          headers: {
            token,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message, {
          autoClose: 1000,
        });
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      const response = await axios.post(
        `${DOMAIN}/api/cart/remove`,
        { itemId },
        {
          headers: {
            token,
          },
        }
      );
      if (response.data.success) {
        toast.warn(response.data.message, {
          autoClose: 1000,
        });
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          // If itemInfo is found (not undefined), calculate totalAmount
          totalAmount += itemInfo.price * cartItems[item];
        }
        // totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    // async function loadData() {
    if (localStorage.getItem("Token")) {
      setToken(localStorage.getItem("Token"));
      loadCartData(localStorage.getItem("Token"));
    }
    // }
    // loadData();
    fetchFoodList();
  }, []);
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    email,
    setEmail,
    loading
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
