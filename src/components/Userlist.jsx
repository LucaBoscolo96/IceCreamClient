import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Userlist() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(
      "https://icecreamapp-database.herokuapp.com/users"
    );
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(
      "https://icecreamapp-database.herokuapp.com/users/" + userId
    );
    getUsers();
  };
  return (
    <div className="container">
      <div className="vh-100 overlay-parent shadow-card zoom-card">
        <div className="overlay "></div>
        <div className="list-title text-center col-12 pt-5">
          <h1 className="mt-1">Users</h1>
          <Link to="/users/add" className="btn btn-primary add-btn fs-5 my-4">
            ADD
          </Link>
        </div>
        <div className="table-responsive-lg">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.uuid}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link
                      to={"/users/edit/" + user.uuid}
                      className="btn btn-md btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUser(user.uuid)}
                      className="btn btn-md btn-secondary mx-1 my-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Userlist;
