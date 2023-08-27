import {useEffect, useState} from "react";
import axiosClient from "../axios-client";
import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import UsersTable from "../components/admin/UsersTable";
import Pagination from "../components/admin/Pagination";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [paginationData, setPaginationData] = useState({
    current_page: 1,
    siblings: 1,
    last_page: 1
  });

  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext();

  useEffect(() => {
    getUsers(paginationData.current_page);
  }, []);

  const getUsers = (page: number) => {
    setLoading(true);

    axiosClient.get('/users?page=' + page)
      .then(({data}) => {
        setUsers(data.data);
        setPaginationData({
          ...paginationData, current_page: data.meta.current_page, last_page: data.meta.last_page});
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
  }

  const handlePageChange = (page: number) => {
    getUsers(page);
  }

  const handleUserDelete = (userId: number) => {

    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    axiosClient.delete(`/users/${userId}`)
    .then(() => {
      setNotification("User was successfully deleted! ");

      getUsers(paginationData.current_page);
    })
  }

  console.log('Users Rendered');

  return (
    <div className="card border-0 shadow-lg">
      <div className="card-header">
        <div className="d-flex flex-row justify-content-between py-2">
          <div className="align-self-start">
            <h1 className="h2">Users</h1>
          </div>
          <div className="align-self-end">
            <Link to="/users/add" className="btn btn-success btn-lg text-white align-self-end">Add new</Link>
          </div>
        </div>
      </div>
      <div className="card-body">
        {loading
        ?
        <div className="text-center h4 p-4">Loading...</div>
        :
        <>
          <UsersTable users={users} onUserDelete={handleUserDelete} />
          <div className="mt-4">
            <Pagination paginationData={paginationData} onPageChange={handlePageChange} />
          </div>
        </>
        }
      </div>
    </div>
  );
}
