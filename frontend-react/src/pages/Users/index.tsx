import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import {useStateContext} from "../../contexts/ContextProvider";
import UsersList from "./components/UsersList";
import Pagination from "../../components/Pagination";
import UsersCreate from "./components/UsersCreate";
import UsersUpdate from "./components/UsersUpdate";
import {NewUser, User, UserFormErrors} from "../../models/User";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Users() {
  const {authUser, setNotification, setAuthUser} = useStateContext();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>({} as User);
  const [errors, setErrors] = useState<UserFormErrors | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [createPage, setCreatePage] = useState<boolean>(false);
  const [updatePage, setUpdatePage] = useState<boolean>(false);
  const [paginationData, setPaginationData] = useState({
    current_page: 1,
    siblings: 2,
    last_page: 1
  });

  useEffect(() => {
    getUsers(paginationData.current_page);
  }, []);

  const getUsers = (page: number) => {
    setLoading(true);

    axiosClient.get('/users?page=' + page)
      .then(({data}) => {
        setLoading(false);
        setUsers(data.data);
        setPaginationData({
          ...paginationData, current_page: data.meta.current_page, last_page: data.meta.last_page
        });
      })
      .catch(() => {
        setLoading(false);
        setLoading(false);
      })
  }

  const handleUserCreate = (userData: NewUser) => {
    setLoading(true);

    axiosClient.post(`/users`, userData)
      .then(() => {
        setLoading(false);
        openUsersList();
        getUsers(1);
        setNotification("User was successfully created!");
      })
      .catch((error) => {
        setLoading(false);

        const response = error.response;

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
  }

  const handleUserUpdate = (formData: User) => {

    setLoading(true);

    axiosClient.put(`/users/${formData.id}`, formData)
      .then((response) => {
        let userData: User = response.data;

        setLoading(false);

        if (userData.id == authUser?.id) {
          setAuthUser({...authUser, ...userData});
        }

        users.map((user, index) => {
          if (user.id == userData.id) {
            users[index] = {...users[index], ...userData};
          }
        });

        setSelectedUser(userData);
        openUsersList();
        setNotification("User was successfully updated!");
      })
      .catch(({response}) => {
        setLoading(false);

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
  }

  const handleUserDelete = (userId: number) => {

    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setLoading(true);

    axiosClient.delete(`/users/${userId}`)
      .then(() => {
        setLoading(false);
        getUsers(paginationData.current_page);
        setNotification("User was successfully deleted! ");
      })
  }

  const handleAvatarUpdate = (user: User, imageFile: File) => {

    let formData = new FormData();

    setLoading(true);

    formData.append('avatar', imageFile);
    axiosClient.post(`/users/${user.id}/upload-image`, formData, {
        headers: {"Content-Type": "multipart/form-data"},
        /* TODO a progress bar */
        /* onUploadProgress: (progressEvent) => {
           let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
           console.log(percentCompleted)
         },*/
      },
    )
      .then((response) => {
        let userData: User = response.data;

        setLoading(false);
        setErrors(null);
        setSelectedUser(userData);
        setNotification("The image was successfully updated!");

        if (userData.id == authUser?.id) {
          setAuthUser({...authUser, ...userData});
        }

        users.map((user, index) => {
          if (user.id == userData.id) {
            users[index] = {...users[index], ...userData};
          }
        });
      })
      .catch(({response}) => {
        setLoading(false);

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
  }

  const handleAvatarDelete = (user: User) => {

    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    setLoading(true);

    axiosClient.patch(`/users/${user?.id}/delete-image`)
      .then(() => {
        setLoading(false);

        if (authUser && user.id == authUser.id) {
          setAuthUser({...authUser, avatar: null});
        }

        users.map((u, index) => {
          if (u.id == user?.id) {
            users[index] = {...users[index], avatar: null};
          }
        });

        setSelectedUser({...selectedUser, avatar: null});
        setNotification("The image was successfully deleted!");
      })
  }

  const changePage = (page: number) => {
    getUsers(page);
  }

  const openUsersList = () => {
    setCreatePage(false);
    setUpdatePage(false);
    setErrors(null);
  }

  const openUserCreate = () => {
    setCreatePage(true);
    setUpdatePage(false);
  }

  const openUserUpdate = (user: User) => {
    setCreatePage(false);
    setUpdatePage(true);
    setSelectedUser(user);
  }

  return (

    <div className="card border-0 shadow-lg">
      {loading && (
        <div style={{backgroundColor: 'rgba(0, 0, 0, .1)'}}
             className="position-absolute d-flex justify-content-center align-items-center top-0 start-0 w-100 h-100 z-2">
          <div className="spinner-border text-center" role="status" style={{width: '5rem', height: '5rem'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="card-header">
        <div className="d-flex flex-row justify-content-between py-2">
          <div className="align-self-start">
            {!updatePage && !createPage && <h1 className="fs-2">Users List</h1>}
            {createPage && <h1 className="fs-2">Create new user</h1>}
            {updatePage && <h1 className="fs-2">Edit User: {selectedUser?.first_name} {selectedUser?.last_name}</h1>}
          </div>
          <div className="align-self-end">
            {!updatePage && !createPage ? (
              <button onClick={openUserCreate} className="btn btn-success btn-lg text-white align-self-end">
                Add new
              </button>
            ) : (
              <button onClick={openUsersList} className="btn btn-success btn-lg text-white align-self-end">
                <FontAwesomeIcon icon={faArrowLeft} className="me-2"/>Back to users
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="card-body">
        {!updatePage && !createPage && (
          <>
            <UsersList users={users} openUserUpdate={openUserUpdate} onUserDelete={handleUserDelete}/>
            <div className="mt-4">
              <Pagination paginationData={paginationData} onPageChange={changePage}/>
            </div>
          </>
        )}

        {createPage && <UsersCreate onUserCreate={handleUserCreate} errors={errors}/>}
        {updatePage &&
          <UsersUpdate user={selectedUser} onUserUpdate={handleUserUpdate} onAvatarUpdate={handleAvatarUpdate}
                       onAvatarDelete={handleAvatarDelete} errors={errors}/>}
      </div>
    </div>
  );
}
