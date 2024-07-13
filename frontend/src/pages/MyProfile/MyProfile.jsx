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
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
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
      setPhone(response.data.data.phone || "");
      setAddress(response.data.data.address || "");
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(response.data.message);
    }
  };
  const updateUser = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `${DOMAIN}/api/user/updateUserByEmail`,
      { name, email, phone },
      { headers: { token } }
    );
    if (response.data.success) {
      console.log("user updated");
      toast.success(response.data.message);
    } else toast.error(response.data.message);
  };
  return (
    <>
      <div className="my-profile-wrapper">
        {/* <h2>My Profile</h2> */}
        <div className="profile-inputs">
          <img src={assets.profile_icon} alt="" width={"40px"} />
          <form onSubmit={updateUser}>
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
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <div className="button-wrapper">
              <button type="submit">Update</button>
              <button type="button" onClick={() => navigate("/myorders")}>
                My orders
              </button>
              <button type="button" onClick={logout}>
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
