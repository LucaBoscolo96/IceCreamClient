import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://icecreamapp-database.herokuapp.com/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div className="row vh-100 justify-content-center align-content-start">
      <div className="col-11 col-md-8 card shadow-card zoom-card text-center mt-5">
        <h1 className="my-4">Add New User</h1>
        <form onSubmit={saveUser}>
          <p className="text-center text-danger">{msg}</p>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="control">
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="control">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="control">
              <input
                type="password"
                className="form-control"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option className="text-muted" value="">
                    select
                  </option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="control">
              <button type="submit" className="btn btn-primary btn-lg mt-3">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddUser;
