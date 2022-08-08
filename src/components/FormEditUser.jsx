import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(
          "https://icecreamapp-database.herokuapp.com/users/" + id
        );
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        "https://icecreamapp-database.herokuapp.com/users/" + id,
        {
          name: name,
          email: email,
          password: password,
          confPassword: confPassword,
          role: role,
        }
      );
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div className="row h-100 justify-content-center align-items-start">
      <div className="col-11 col-md-8 card shadow-card zoom-card text-center mt-5">
        <h1 className="my-4">Update User</h1>
        <form onSubmit={updateUser}>
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
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEditUser;
