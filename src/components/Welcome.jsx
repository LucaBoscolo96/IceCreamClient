import React from "react";
import { useSelector } from "react-redux";

function Welcome() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div
      id="welcome"
      className="row h-100 justify-content-center align-items-center"
    >
      <div className="col-8">
        <h1 className="text-center text-white welcome-text">
          Welcome Back, <br /> <strong>{user && user.name}!</strong>
        </h1>
      </div>
    </div>
  );
}

export default Welcome;
