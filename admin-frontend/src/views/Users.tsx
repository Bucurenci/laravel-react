import {useEffect, useState} from "react";
import axiosClient from "../axios-client";
import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";

export default function Users() {
  const {setNotification} = useStateContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/users')
      .then(({data}) => {
        setLoading(false);
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false);
      })
  }

  const onDelete = (user) => {

    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    axiosClient.delete(`/users/${user.id}`)
    .then(() => {
      setNotification("User was successfully deleted! ");

      getUsers();
    })
  }

  return (
      <>
        <div className="d-flex flex-row justify-content-between mb-4">
          <div className="align-self-start">
            <h1>Users</h1>
          </div>
          <div className="align-self-end">
            <Link to="/users/add" className="btn btn-success btn-lg text-white align-self-end">Add new</Link>
          </div>
        </div>
        <div className="card">
          <table className={"table"}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Create Date</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            {loading &&
              <tbody>
                <tr>
                  <td colSpan={6} className="text-center">Loading...</td>
                </tr>
              </tbody>}
            {!loading &&
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.email}</td>
                    <td>{u.first_name}</td>
                    <td>{u.last_name}</td>
                    <td>{u.created_at}</td>
                    <td className="text-right">
                      <button onClick={ev => onDelete(u)} className="btn btn-danger ms-2 float-end">
                        <i className="fa fa-trash me-2"></i>
                        Delete
                      </button>
                      <Link to={"/users/" + u.id} className="btn btn-primary float-end">
                        <i className="fa fa-pencil me-2"></i>
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
            }
          </table>
        </div>
      </>
  );
}
