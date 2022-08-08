import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Productlist = () => {
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get(
      "https://icecreamapp-database.herokuapp.com/products"
    );
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(
      "https://icecreamapp-database.herokuapp.com/products/" + productId
    );
    getProducts();
  };
  return (
    <div className="row justify-content-center">
      <div className="col-12 text-center">
        <h1 className="my-3">Products</h1>
        {user && user.role === "admin" && (
          <Link
            to="/products/add"
            className="btn btn-primary my-5 fs-5 add-btn"
          >
            ADD
          </Link>
        )}
      </div>
      <div className="row justify-content-around">
        {products.map((product) => (
          <div
            key={product.uuid}
            className="col-sm-12 col-md-5 col-xl-3 mx-md-1 mb-3 mb-md-0 p-md-2 product-card"
          >
            <div className="pb-2 pb-lg-5 pb-lg-0">
              <div className="card zoom-card shadow-card box-shadow-custom">
                <a href={"/products/edit/" + product.uuid}>
                  <h2>{product.name}</h2>
                  <div className="card-img">
                    <img src={product.imgLink} alt={product.name} />
                  </div>
                  <div className="card-top">
                    <h4 className="my-3">Price: {product.price} €</h4>
                    <h4 className="mb-1">Quantity: {product.quantity}</h4>
                  </div>
                  <div className="card-body text-center">
                    <Link
                      to={"/products/edit/" + product.uuid}
                      className="btn btn-primary card-button"
                    >
                      {user && user.role === "admin" && "Order"}
                      {user && user.role === "user" && "Take"}
                    </Link>{" "}
                    {user && user.role === "admin" && (
                      <button
                        onClick={() => deleteProduct(product.uuid)}
                        className="btn btn-secondary card-button"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productlist;
