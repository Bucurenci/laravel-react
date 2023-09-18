export default function UsersList({users, onUserDelete, openUserUpdate}) {

  return (
    <table className="table align-middle">
      <thead>
      <tr>
        <th>ID</th>
        <th width={75}>Avatar</th>
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
          <td>
            <img src={u.avatar ? u.avatar : "/img/user-avatar-placeholder-xs.png"} alt={`${u.first_name} Photo`}
                 className="img-fluid rounded-circle"/>
          </td>
          <td>{u.email}</td>
          <td>{u.first_name}</td>
          <td>{u.last_name}</td>
          <td>{u.created_at}</td>
          <td className="text-right">
            <button onClick={ev => onUserDelete(u.id)} className="btn btn-danger ms-2 float-end">
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
