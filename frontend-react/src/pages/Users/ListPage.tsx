import {ChangeEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosClient from "../../axios-client";
import {useStateContext} from "../../contexts/ContextProvider";
import {User, UserFormErrors} from "../../models/User";
import {UserUpdateType} from "../../models/User";
import UserUpdateForm from "./components/UserUpdateForm";
import AvatarForm from "./components/AvatarForm";
import UsersTable from "./components/UsersTable";
import {Paper, Pagination, Grid, Box, Button, Typography} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReplyIcon from '@mui/icons-material/Reply';

export default function ListPage() {
  const navigate = useNavigate();
  const {authUser, setNotification, setAuthUser} = useStateContext();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>({} as User);
  const [errors, setErrors] = useState<UserFormErrors | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
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

  const handleUserUpdate = (formData: UserUpdateType) => {

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
        openUsersTable();
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
      .catch(({response}) => {
        setLoading(false);
        setNotification(response.data, 'error');
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

  const changePage = (event: ChangeEvent<unknown>, page: number) => {
    event.preventDefault();

    if (paginationData.current_page !== page) {
      setPaginationData({...paginationData, current_page: page})
      getUsers(page);
    }
  }

  const openUsersTable = () => {
    setUpdatePage(false);
    setErrors(null);
  }

  const openUserUpdate = (user: User) => {
    setUpdatePage(true);
    setSelectedUser(user);
  }

  return (
    <>
      <Grid container minHeight={75} display="flex" flexDirection="row"
            justifyContent="space-between" alignItems="top">
        <Box component="div">
          {!updatePage ? (
            <Typography variant="h4" mb={0} gutterBottom>Users list</Typography>
          ) : (
            <Typography variant="h4" mb={0} gutterBottom>Edit
              User: {selectedUser?.first_name} {selectedUser?.last_name}</Typography>
          )}
        </Box>
        <Box component="div">
          {!updatePage ? (
            <Button onClick={() => navigate('/users-create')} variant="contained" size="large" color="success"
                    startIcon={<PersonAddIcon/>}>
              New user
            </Button>
          ) : (
            <Button onClick={openUsersTable} variant="contained" size="large"
                    startIcon={<ReplyIcon/>} sx={{mb: {xs: 3, sm: 0}, mt: {xs: 2, sm: 0}}}>
              Back to users
            </Button>
          )}
        </Box>
      </Grid>


      <Paper sx={{position: "relative"}}>
        {loading && (
          <div style={{backgroundColor: 'rgba(0, 0, 0, .1)'}}
               className="position-absolute d-flex justify-content-center align-items-center top-0 start-0 w-100 h-100 z-2">
            <div className="spinner-border text-center" role="status" style={{width: '5rem', height: '5rem'}}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <div className="card-body">
          {!updatePage && (
            <>
              <UsersTable users={users} openUserUpdate={openUserUpdate} onUserDelete={handleUserDelete}/>

              <Grid container minHeight={80} mt={0} spacing={2} display="flex" justifyContent="center"
                    alignItems="center">
                <Pagination count={paginationData.last_page}
                            onChange={changePage}
                            color="primary"/>
              </Grid>
            </>
          )}

          {updatePage && (
            <Grid container display="flex" justifyContent="center" sx={{p: {xs: 2, sm: 3, md: 4}}}>
              <Grid item xs={12} sm={12} md={12} lg={11} xl={9}>

                <Grid container display="flex" justifyContent="center" alignItems="center"
                      columnSpacing={{xs: 0, lg: 3}}>
                  {selectedUser.id && (
                    <Grid item xs={12} lg={4} sx={{mb: {xs: 3, lg: 0}}}>
                      <AvatarForm user={selectedUser} errors={errors} onUpdate={handleAvatarUpdate}
                                  onDelete={handleAvatarDelete}/>
                    </Grid>
                  )}
                  <Grid item xs={12} lg={8}>
                    <UserUpdateForm user={selectedUser} serverErrors={errors} onUserUpdate={handleUserUpdate}/>
                  </Grid>
                </Grid>

              </Grid>
            </Grid>
          )}
        </div>
      </Paper>
    </>
  );
}
