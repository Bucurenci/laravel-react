import {User} from "../../../../models/User";

interface UsersListProps {
  users: User[],
  onUserDelete: (id: number) => void,
  openUserUpdate: (u: User) => void,
}

export default function UsersList({users, onUserDelete, openUserUpdate}: UsersListProps) {

  return (
    <table className="table align-middle">
      <thead>
      <tr>
        <th>ID</th>
        <th style={{width: '75px'}}>Avatar</th>
        <th>Email</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Create Date</th>
        <th className="text-end">Actions</th>
      </tr>
      </thead>
      <tbody>

      {users.map((u, index) => (
        <tr key={index}>
          <td>{u.id}</td>
          <td>
            <img src={u.avatar ? u.avatar.thumb : "/img/user-avatar-placeholder-xs.png"}
                 alt={`${u.first_name} Photo`}
                 className="img-fluid rounded-circle"/>
          </td>
          <td>{u.email}</td>
          <td>{u.first_name}</td>
          <td>{u.last_name}</td>
          <td>{u.created_at}</td>
          <td className="text-right">
            <button onClick={() => onUserDelete(u.id)} className="btn btn-danger ms-2 float-end">
              <i className="fa fa-trash me-2"></i>
              Delete
            </button>
            <button onClick={() => openUserUpdate(u)} className="btn btn-primary ms-2 float-end">
              <i className="fa fa-pencil me-2"></i>
              Edit
            </button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}
