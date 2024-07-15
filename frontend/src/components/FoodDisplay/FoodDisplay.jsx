import React, { useContext, useEffect, useState } from "react";
import "./foodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

function FoodDisplay({ category }) {
  const { food_list, loading } = useContext(StoreContext);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [vegOnly, setVegOnly] = useState(false); // State for Veg/Non-Veg switch

  useEffect(() => {
    setLocationLoading(true);
    // Function to fetch user's current location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationLoading(false);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLocationError(true);
          setLocationLoading(false);
          // Handle errors, e.g., show message to user or fallback
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocationError(true);
      setLocationLoading(false);
      // Handle cases where geolocation is not supported
    }
  }, []);

  // Function to calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon1 - lon2);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // Function to handle sorting
  const handleSort = (event) => {
    setSortOrder(event.target.value);
  };

  // Function to handle Veg/Non-Veg switch
  const handleVegSwitch = () => {
    setVegOnly((prevVegOnly) => !prevVegOnly);
  };

  // Sort and filter the food list based on the selected order and Veg/Non-Veg filter
  const sortedFoodList = [...food_list]
    .filter((item) => (vegOnly ? item.veg : true))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else if (sortOrder === "desc") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <>
      <br />
      <div className="title">
        <h2>Top dishes</h2>
        {loading || locationLoading ? (
          <></>
        ) : (
          <div className="controls">
            <div className="sort-container">
              <select id="sort" value={sortOrder} onChange={handleSort}>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
            <div className="veg-switch">
              <label>
                <input
                  type="checkbox"
                  checked={vegOnly}
                  onChange={handleVegSwitch}
                />
                Veg Only
              </label>
            </div>
          </div>
        )}
      </div>

      {loading || locationLoading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : locationError ? (
        <div className="location">
          <h6> :(</h6>
          <p className="location-error">
            We couldn't fetch your location. Please enable location services and
            refresh the page.
          </p>
        </div>
      ) : (
        <div className="food-display" id="food-display">
          <div className="food-display-list">
            {sortedFoodList.map((item) => {
              // Check if userLocation is available and if the distance is within 20 km
              if (
                userLocation &&
                calculateDistance(
                  userLocation.latitude,
                  userLocation.longitude,
                  26.7693514,
                  88.3774669
                ) <= 20 &&
                (category === "All" || category === item.category)
              ) {
                return (
                  <FoodItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    category={item.category}
                    available={item.available}
                    veg={item.veg}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
          {!food_list.some(
            (item) =>
              (category === "All" || category === item.category) &&
              userLocation &&
              calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                26.7693514,
                88.3774669
              ) <= 14
          ) && (
            <div className="location" key="location-error">
              <h6>:( </h6>
              <p className="error">
                We are not available at your location. We serve only within a 10
                km radius.
              </p>
              <p className="sol">
                If you are a developer, go ahead and change your browser's lat &
                long to 26.7693514 & 88.3774669. (For testing purposes only).
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default FoodDisplay;
