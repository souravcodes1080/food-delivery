import React, { useEffect, useState } from "react";
import "./verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DOMAIN } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
function Verify() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const [loading, setLoading] = useState(false);
  const verifyPayment = async () => {
    const response = await axios.post(`${DOMAIN}/api/order/verify`, {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myorders");
      toast.success(response.data.message)
    } else {
      navigate("/");
      toast.error(response.data.message)
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);
  return (
    <>
      <div className="verify">
        <div className="spinner"></div>
      </div>
    </>
  );
}

export default Verify;
