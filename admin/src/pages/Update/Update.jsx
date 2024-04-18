import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./update.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import { DOMAIN } from "../../config";
import { toast } from "react-toastify";
function Update() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [isAvailable, setIsAvailable] = useState(true);
  const [data, setData] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
    category: "",
    available: isAvailable,
    veg: "",
  });
  const fetchFoodData = async () => {
    const response = await axios.get(`${DOMAIN}/api/food/getFoodById/${id}`);
    if (response.data.success) {
      setData({
        image: response.data.data.image,
        name: response.data.data.name,
        description: response.data.data.description,
        price: response.data.data.price,
        category: response.data.data.category,
        available: response.data.data.available,
        veg: response.data.data.veg,
      });
    } else {
      console.log("data:-" + response.data.message);
    }
  };
  useEffect(() => {
    fetchFoodData();
  }, []);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (e) =>{
    e.preventDefault()
    const response = await axios.patch(`${DOMAIN}/api/food/update/available/${id}`,{
      price : data.price,
      available: data.available
    })
    if( response.data.success){
      toast.success(response.data.message)
      navigate('/list')
    }else{
      toast.error(response.data.message)
    }
  }
  const removeHandler = async (e) =>{
    e.preventDefault()
    const response = await axios.post(`${DOMAIN}/api/food/remove`,{
      id : id,
    })
    if( response.data.success){
      toast.success(response.data.message)
      navigate('/list')
    }else{
      toast.error(response.data.message)
    }
  }
  return (
    <>
      <div className="add">
        <form className="flex-col" onSubmit={onSubmitHandler}>
          <div className="add-image-upload flex-col">
            <img src={`${DOMAIN}/images/${data.image}`} alt="upload image" />
          </div>
          <div className="add-product-name flex-col">
            <p>Product Name *</p>
            <input type="text" value={data.name} readOnly disabled />
          </div>
          <div className="add-product-desc flex-col">
            <p>Product Description *</p>
            <textarea
              readOnly
              disabled
              value={data.description}
              rows="6"
              placeholder="Write content here..."
            />
          </div>
          <div className="add-category-price ">
            <div className="add-category flex-col">
              <p>Product Category *</p>
              <select value={data.category} readOnly disabled>
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
                type="number"
                name="price"
                value={data.price}
                placeholder="$20"
                onChange={onChangeHandler}
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
              type="checkbox"
              checked={data.available}
            />
          </div>
          <div className="add-veg">
            <div className="veg-option">
              <input
                type="radio"
                id="veg"
                checked={data.veg === true}
                value="true"
                disabled
              />
              <label htmlFor="veg">Veg</label>
            </div>
            <div className="veg-option">
              <input
                type="radio"
                id="nonveg"
                checked={data.veg === false}
                value="false"
                disabled
              />
              <label htmlFor="nonveg">Non veg</label>
            </div>
          </div>
          <div className="update-remove">
             <button type="submit" className="add-btn">
            Update
          </button>
          <button onClick={removeHandler} className="add-btn">
            Remove Item
          </button>
          </div>
         
        </form>
      </div>
    </>
  );
}

export default Update;
