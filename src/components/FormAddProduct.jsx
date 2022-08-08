import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imgLink, setImgLink] = useState(
    "https://source.unsplash.com/500x400/?icecream"
  );
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://icecreamapp-database.herokuapp.com/products", {
        name: name,
        price: price,
        quantity: quantity,
        imgLink: imgLink,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="row h-100 justify-content-center align-items-start">
      <div className="col-11 col-md-8 card shadow-card zoom-card text-center mt-5">
        <h1 className="mt-4">Add a New Product!</h1>
        <form onSubmit={saveProduct}>
          <p className="text-center text-danger">{msg}</p>
          <div className="form-group">
            <label className="form-label fs-5 mb-3">Product Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
            />
          </div>
          <div className="form-group">
            <label className="form-label fs-5 my-3">Price</label>

            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Price"
            />
          </div>
          <div className="form-group">
            <label className="form-label fs-5 my-3">Quantity</label>

            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="form-control"
              placeholder="Quantity"
            />
          </div>
          <div className="form-group">
            <label className="form-label fs-5 mt-3">Product Image</label>
            <p>
              add a link to the product image <br />
              (if you don't insert a link, the default image will be assigned)
            </p>
            <input
              type="text"
              className="form-control"
              value={imgLink}
              onChange={(e) => setImgLink(e.target.value)}
              placeholder="Product name"
            />
          </div>
          <div className="field">
            <button type="submit" className="btn btn-primary btn-lg mt-3">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddProduct;
