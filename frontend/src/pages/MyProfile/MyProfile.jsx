import React, { useEffect, useState } from "react";
import "./myprofile.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { DOMAIN } from "../../config";
import { toast } from "react-toastify";

import axios from "axios";
function MyProfile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // const [address, setAddress] = useState("");

  const [apartmentNo, setApartmentNo] = useState("");
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");

  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const token = localStorage.getItem("Token");
  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Email");
    navigate("/");
  };
  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      navigate("/");
    }
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    const email = localStorage.getItem("Email");
    setLoading(true);
    const response = await axios.post(
      `${DOMAIN}/api/user/getUserByEmail`,
      { email },
      { headers: { token } }
    );
    if (response.data.success) {
      setName(response.data.data.name || "");
      setEmail(response.data.data.email || "");
      setPhone(response.data.data.phoneNumber || "");
      setApartmentNo(response.data.data.apartmentNo || "");
      setArea(response.data.data.area || "");
      setStreet(response.data.data.street || "");
      setLandmark(response.data.data.landmark || "");
      setCity(response.data.data.city || "");
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(response.data.message);
    }
  };
  const updateUser = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    const response = await axios.post(
      `${DOMAIN}/api/user/updateUserByEmail`,
      { name, email, phone, apartmentNo, street, area, landmark, city },
      { headers: { token } }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      fetchUserData();
      setUpdateLoading(false);
    } else {
      setUpdateLoading(false);
      toast.error(response.data.message);
    }
  };
  return (
    <>
      <div className="my-profile-wrapper">
        {/* <h2>My Profile</h2> */}
        {loading ? (
          <div className="loader-wrapper">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="profile-inputs">
            <img src={assets.profile_icon} alt="" width={"40px"} />
            <form onSubmit={updateUser}>
              <p>Account details</p>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <input type="email" disabled placeholder="Email" value={email} />
              <p>Address</p>
              <div className="multi-fields-profile">
                <input
                  onChange={(e) => {
                    setApartmentNo(e.target.value);
                  }}
                  value={apartmentNo}
                  type="text"
                  placeholder="Apartment No"
                />

                <input
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                  value={street}
                  type="text"
                  placeholder="Street"
                />
              </div>
              <input
                onChange={(e) => {
                  setArea(e.target.value);
                }}
                value={area}
                type="text"
                placeholder="Locality"
              />
              <div className="multi-fields-profile multi-fields-profile-2">
                <input
                  onChange={(e) => {
                    setLandmark(e.target.value);
                  }}
                  value={landmark}
                  type="text"
                  placeholder="Landmark"
                />
                <input
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  value={city}
                  type="text"
                  placeholder="City"
                />
              </div>
              <div className="button-wrapper">
                <button type="submit">
                  {updateLoading ? "Updating..." : "Update"}
                </button>
                <button type="button" onClick={() => navigate("/myorders")}>
                  My orders
                </button>
                <button type="button" onClick={logout}>
                  Logout
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default MyProfile;
