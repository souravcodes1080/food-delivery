import React, { useEffect, useState } from "react";
import "./add.css";
import { assets } from "../../assets/assets";
import { DOMAIN } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
function Add() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    available: isAvailable,
    veg: "",
  });
  const handleVegChange = (e) => {
    const isVeg = e.target.value === "true";
    setData((prevData) => ({ ...prevData, veg: isVeg }));
  };
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("available", Boolean(data.available));
    formData.append("veg", Boolean(data.veg));
    formData.append("image", image);
    const response = await axios.post(`${DOMAIN}/api/food/add`, formData);

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "",
        available: isAvailable,
        veg: "",
      });
      setImage(false);

      setLoading(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="add">
        <form className="flex-col" onSubmit={onSubmitHandler}>
          <div className="add-image-upload flex-col">
            <p>Upload Image *</p>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="upload image"
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              required
              hidden
            />
          </div>
          <div className="add-product-name flex-col">
            <p>Product Name *</p>
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              required
              name="name"
              placeholder="Type here"
            />
          </div>
          <div className="add-product-desc flex-col">
            <p>Product Description *</p>
            <textarea
              onChange={onChangeHandler}
              value={data.description}
              required
              name="description"
              rows="6"
              placeholder="Write content here..."
            />
          </div>
          <div className="add-category-price ">
            <div className="add-category flex-col">
              <p>Product Category *</p>
              <select
                name="category"
                onChange={onChangeHandler}
                value={data.category}
              >
                <option value="">- Select a category -</option>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product Price *</p>
              <input
                onChange={onChangeHandler}
                value={data.price}
                type="number"
                name="price"
                placeholder="$20"
              />
            </div>
          </div>
          <div className="add-availibilty">
            <p>Product Available *</p>
            <input
              onChange={(e) => {
                setIsAvailable(e.target.checked);
                setData((prevData) => ({
                  ...prevData,
                  available: e.target.checked,
                }));
              }}
              checked={isAvailable}
              type="checkbox"
            />
          </div>
          <div className="add-veg">
            <div className="veg-option">
              <input
                type="radio"
                id="veg"
                name="veg"
                value="true"
                checked={data.veg === true}
                onChange={handleVegChange}
              />
              <label htmlFor="veg">Veg</label>
            </div>
            <div className="veg-option">
              <input
                type="radio"
                id="nonveg"
                name="veg"
                value="false"
                checked={data.veg === false}
                onChange={handleVegChange}
              />
              <label htmlFor="nonveg">Non veg</label>
            </div>
          </div>
          <button type="submit" className="add-btn">
            {loading ? "Adding Food..." : "Add"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Add;
