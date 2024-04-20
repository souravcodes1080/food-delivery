import React, { useContext } from "react";
import "./foodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
function FoodDisplay({ category }) {
  const { food_list, loading } = useContext(StoreContext);
  return (
    <>
      <h2>Top dishes near you</h2>
      {loading ? (
        <>
          <div className="loader-wrapper">
            <div className="loader"></div>
          </div>
        </>
      ) : (
        <>
          <div className="food-display" id="food-display">
            <div className="food-display-list">
              {}
              {food_list.map((item, index) => {
                if (category === "All" || category === item.category) {
                  return (
                    <FoodItem
                      key={index}
                      id={item._id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      image={item.image}
                    />
                  );
                }
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FoodDisplay;
