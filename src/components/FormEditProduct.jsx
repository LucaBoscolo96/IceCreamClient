import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";

const FormEditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [img, setImg] = useState("");

  const [msg, setMsg] = useState("");
  const prevQuantity = useRef(0);
  const [newQuantity, setNewQuantity] = useState();

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const customMsg = () => {
    if (user.today === 0) {
      return "You still haven't had any ice cream today!";
    }
    if (user.today === 1) {
      return "You have already taken one ice cream today";
    }
    if (user.today === 2) {
      return "You had enough ice cream for today. Come back tomorrow!";
    }
  };
  const templateParams = {
    product: name,
    quantity: newQuantity,
  };

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          "https://icecreamapp-database.herokuapp.com/products/" + id
        );
        setName(response.data.name);
        setPrice(response.data.price);
        setImg(response.data.imgLink);
        prevQuantity.current = response.data.quantity;
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  useEffect(() => {
    setNewQuantity(parseInt(prevQuantity.current, 10) - parseInt(quantity, 10));
  }, [quantity]);

  const checkQuantity = (e) => {
    e.preventDefault();
    console.log(quantity);
    if (user.role === "admin") {
      if (quantity < 5) {
        setMsg("Order at least 5 items!");
      } else {
        orderIcecream();
      }
    }
    if (user.role === "user") {
      if (user.today + parseInt(quantity, 10) > 2) {
        setMsg("You can take maximum 2 ice cream per day!");
      } else {
        console.log(quantity);
        takeIcecream();
      }
    }
  };

  const orderIcecream = async () => {
    try {
      await axios.patch(
        "https://icecreamapp-database.herokuapp.com/products/" + id,
        {
          quantity: parseInt(prevQuantity.current, 10) + parseInt(quantity, 10),
        }
      );
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const takeIcecream = async () => {
    console.log(newQuantity);

    try {
      await axios.patch(
        "https://icecreamapp-database.herokuapp.com/products/" + id,
        {
          quantity: newQuantity,
        }
      );
      if (newQuantity < 10) {
        emailjs.send(
          "default_service",
          "template_icecream",
          templateParams,
          "cD0MTG16d4UZX8cVk"
        );
        console.log("email sent");
      }
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
    todayCount();
  };

  const todayCount = async () => {
    try {
      await axios.patch(
        "https://icecreamapp-database.herokuapp.com/users/" + user.uuid,
        {
          today: user.today + parseInt(quantity, 10),
        }
      );
    } catch (error) {
      if (error.response) {
        setMsg("A problem occured. Retry");
      }
    }
  };

  return (
    <div className="row h-100 justify-content-center align-items-start">
      <div className="col-11 col-md-8 card shadow-card zoom-card text-center mt-5">
        <h2 className="my-4">{name.toUpperCase()}</h2>
        <div>
          <div className="card-img">
            <img src={img} alt="" />
          </div>
          <div className="card-content">
            <div className="content">
              <form onSubmit={checkQuantity}>
                <p className="text-center text-danger my-3 fs-5">{msg}</p>

                {user && user.role === "admin" && (
                  <div>
                    <h5 className="my-3">
                      Price: <span>{price} €</span>
                    </h5>
                  </div>
                )}
                <div>
                  <h5 className="my-3">
                    Current Quantity: <span>{prevQuantity.current}</span>
                  </h5>
                </div>
                {user && user.role === "user" && (
                  <div>
                    <h5>{customMsg()}</h5>
                  </div>
                )}

                <div className="form-group">
                  {user && user.role === "admin" && (
                    <div>
                      <h5>How many would you like to order?</h5>
                      <span>Min 5</span>
                    </div>
                  )}

                  {user && user.role === "user" && user.today < 2 && (
                    <div>
                      <h5>How many would you like to take?</h5>
                      <span>Max 2</span>
                    </div>
                  )}
                  <div className="my-4 control">
                    {user && user.today < 2 && (
                      <input
                        type="number"
                        className="form-control"
                        min="0"
                        value={quantity}
                        onChange={(e) => setQuantity(e.currentTarget.value)}
                        placeholder="Quantity"
                      />
                    )}
                  </div>
                </div>

                <div>
                  {user && user.role === "admin" && quantity > 0 && (
                    <h5 className="mt-3">Tot: {price * quantity} €</h5>
                  )}
                </div>
                <div className="field">
                  <div className="control">
                    {user && user.today < 2 && (
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg mt-3"
                      >
                        {user && user.role === "admin" && "Order"}
                        {user && user.role === "user" && "Take"}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditProduct;
