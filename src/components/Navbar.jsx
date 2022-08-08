import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, LogOut, reset } from "../features/authSlice";
import logo from "../css/images/logo-img.png";
import { IoIceCreamOutline } from "react-icons/io5";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  let prevScrollpos = window.scrollY;
  window.onscroll = function () {
    let currentScrollPos = window.scrollY;
    if (prevScrollpos < currentScrollPos) {
      document.getElementById("nav-container").classList.add("background");
    }
    if (currentScrollPos === 0) {
      document.getElementById("nav-container").classList.remove("background");
    }
    prevScrollpos = currentScrollPos;
  };
  return (
    <div id="nav-container">
      <nav className="navbar navbar-expand-md">
        <div className="container-fluid justify-content-end">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item underline ">
                <NavLink className="nav-link" to={"/dashboard"}>
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item underline ">
                <NavLink className="nav-link" to={"/products"}>
                  Products
                </NavLink>
              </li>
              {user && user.role === "admin" && (
                <li className="nav-item underline ">
                  <NavLink
                    className="nav-link border-right-custom"
                    to={"/users"}
                  >
                    Users
                  </NavLink>
                </li>
              )}
              <li className="nav-item underline">
                <a onClick={logout} className=" nav-link clickable">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="nav-img">
        <a href="/dashboard">
          <IoIceCreamOutline className="logo-icon" />
          <img src={logo} alt="logo" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
