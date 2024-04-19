import React, { useContext } from "react";
import "./foodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { DOMAIN } from "../../config";
function FoodItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  return (
    <>
      <div className="food-item">
        <div className="food-item-img-container">
          <img className="food-item-image" src={`${DOMAIN}/images/${image}`} alt={name} />
          {!cartItems[id] ? (
            <img
              src={assets.add_icon_white}
              className="add"
              onClick={() => addToCart(id)}
              alt=""
            />
          ) : (
            <div className="food-item-conter">
              <img
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt=""
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
          </div>
          <p className="food-item-desc">{description}</p>
          <p className="food-item-price">${price}</p>
        </div>
      </div>
    </>
  );
}

export default FoodItem;
