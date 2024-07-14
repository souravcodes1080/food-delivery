import React, { useContext } from "react";
import "./foodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { DOMAIN } from "../../config";
function FoodItem({
  id,
  name,
  price,
  description,
  image,
  category,
  available,
}) {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  return (
    <>
      <div className={available ? "food-item" : "unavailable food-item"}>
        <div className="food-item-img-container">
          {available ? (
            <></>
          ) : (
            <div className="item-unavailable-wrapper">
              <p className="item-unavailabe">
                Sorry the item is currently unavailable
              </p>
            </div>
          )}

          <img className="food-item-image" src={image} alt={name} />
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
          </div>
          <p className="food-item-desc">{description}</p>

          {/* <div className="food-item-rating">
            <img src={assets.rating_starts} alt="" />
          </div> */}
          <div className=" food-price-rating-wrapper">
            <p className="food-item-price">₹{price}</p>
            <p className="bubble">{category}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FoodItem;
