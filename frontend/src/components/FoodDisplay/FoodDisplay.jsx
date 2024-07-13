import React, { useContext, useEffect, useState } from "react";
import "./foodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

function FoodDisplay({ category }) {
  const { food_list, loading } = useContext(StoreContext);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    // Function to fetch user's current location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLocationError(true);
          // Handle errors, e.g., show message to user or fallback
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocationError(true);
      // Handle cases where geolocation is not supported
    }
  }, []);

  // Function to calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
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

  return (
    <>
      <h2>Top dishes near you</h2>
      {loading ? (
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
          <div className="food-display-list" >
            {food_list.map((item, index) => {
              // Check if userLocation is available and if the distance is within 10 km
              if (
                userLocation &&
                calculateDistance(
                  userLocation.latitude,
                  userLocation.longitude,
                  26.7693514,
                  88.3774669
                ) <= 10 &&
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
              ) <= 10
          ) && (
            <div className="location" key="location-error">
              <h6>:( </h6>
              <p className="error">
                We are not available at your location. We serve only within 10km
                radius.
              </p>
              <p className="sol">
                If you are a developer, go ahead and change your browser's lat &
                long to 26.7693514 & 88.3774669. (For testing purpose only).
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default FoodDisplay;
