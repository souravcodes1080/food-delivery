import React, { useEffect, useState } from "react";
import "./list.css";
import { DOMAIN } from "../../config";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom'
import axios from "axios";
import { assets } from "../../assets/assets";
function List() {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${DOMAIN}/api/food/list`);
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
        <p>All Food List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b></b>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item, index) => {
            return (
              <div className="list-table-format" key={index}>
                <img
                  className={
                    item.available ? "vegnonveg hide" : "vegnonveg opacity hide"
                  }
                  src={item.veg ? assets.veg_icon : assets.nonveg_icon}
                  alt=""
                />
                <img
                  className={
                    item.available ? "food-image" : "food-image opacity"
                  }
                  src={`${DOMAIN}/images/` + item.image}
                  alt={item.name}
                />
                <p className={item.available ? "" : "opacity"}>{item.name}</p>
                <p className={item.available ? "hide" : "hide opacity"}>
                  {item.category}
                </p>
                <p className={item.available ? "" : "opacity"}>${item.price}</p>
                <Link to={`/update/${item._id}`}>
                  <p
                    className={
                      item.available
                        ? "cursor-pointer"
                        : " cursor-pointer opacity"
                    }
                  >
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

export default List;
