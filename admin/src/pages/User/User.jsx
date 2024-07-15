import React, { useEffect, useState } from "react";
import { DOMAIN } from "../../config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import { assets } from "../../assets/assets";
function User() {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${DOMAIN}/api/user/`);
    if (response.data.success) {
      setList(response.data.data);
      console.log(response.data);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
      <div className="list add flex-col">
        <p>All User List</p>
        <div className="list-table">
          <div className="list-table-format list-table-format-user title">
            <b>Name</b>
            <b>Email</b>
            <b>Phone Number</b>
            <b>Action</b>
          </div>
          {list.map((item, index) => {
            return (
              <div
                className="list-table-format list-table-format-user"
                key={index}
              >
                <p>{item.name}</p>

                <p>{item.email}</p>
                <p>{item.phoneNumber}</p>
                <Link to={`/update/${item._id}`}>
                  <p className={"cursor-pointer"}>
                    <img src={assets.edit_icon} className="edit-icon" />
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default User;
