import {Link} from "react-router-dom";

export default function UsersTable({users, onUserDelete}) {

  console.log("UsersTable Rendered");

  return (
    <>
      {!users.length && <div className="text-center h4 p-4">No username...</div>}
      {users.length &&
        <table className="table">
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
          <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.first_name}</td>
              <td>{u.last_name}</td>
              <td>{u.created_at}</td>
              <td className="text-right">
                <button onClick={ev => onUserDelete(u.id)} className="btn btn-danger ms-2 float-end">
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
        </table>
      }
    </>
  );
}
