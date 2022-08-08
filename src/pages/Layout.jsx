import React from "react";
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div>
        <Navbar />
      </div>
      <div className=" vh-100">
        <div id="main" className="container vh-100">
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
