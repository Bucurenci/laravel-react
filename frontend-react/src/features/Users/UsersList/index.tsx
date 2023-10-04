import {ChangeEvent, useEffect} from "react";
import {Paper, Pagination, Grid, Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import Loading from "../../../components/Loading";
import UsersTable from "../components/UsersTable";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {useUsersData} from "../../../hooks/Api/useUsersData";
import {useDeleteUser} from "../../../hooks/Api/useDeleteUser";
import FetchError from "../../../components/FetchError";

interface UsersListProps {
  page?: number;
}

export default function UsersList({page}: UsersListProps) {
  const navigate = useNavigate();
  const {setNotification} = useStateContext();
  const {data: users, isLoading: isUsersListLoading, isError: isUsersListError, refetch} = useUsersData({
    page: page ? page : 1
  });
  const {
    mutate: deleteUser,
    isLoading: isDeleteUserLoading,
    isSuccess: isDeleteUserSuccess,
    isError: isDeleteUserError
  } = useDeleteUser();

  useEffect(() => {
    if (isDeleteUserSuccess) {
      setNotification("User was successfully deleted! ");
    }

    if (isDeleteUserError) {
      setNotification("An unexpected error occurred... Please try again!", 'error');
    }
  }, [isDeleteUserSuccess, isDeleteUserError]);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    event.preventDefault();

    navigate(`/users/list/${page}`);
  }

  const handleUserUpdate = (userId: number) => {
    navigate(`/users/update/${userId}?users-page=${page ? page : 1}`);
  }

  const handleUserDelete = (userId: number) => {

    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    deleteUser(userId);
  }

  return (
    <>
      <Grid container minHeight={75} display="flex" flexDirection="row"
            justifyContent="space-between" alignItems="top">
        <Box component="div">
          <Typography variant="h4" mb={0} gutterBottom>Users list</Typography>
        </Box>
        <Box component="div">
          <Button onClick={() => navigate('/users/create')} variant="contained" size="large" color="success"
                  startIcon={<PersonAddIcon/>}>
            New user
          </Button>
        </Box>
      </Grid>

      <Paper sx={{position: "relative", minHeight: 'calc(100vh - 230px)'}}>

        {isUsersListLoading ? (
          <Loading isLoading={true}/>
        ) : (isUsersListError ? (
            <FetchError onFetch={refetch}/>
          ) : (
            <>
              <Loading isLoading={isDeleteUserLoading}/>

              <UsersTable users={users?.data} onUserUpdate={handleUserUpdate} onUserDelete={handleUserDelete}/>

              <Grid container minHeight={80} mt={0} spacing={2} display="flex" justifyContent="center"
                    alignItems="center">
                <Pagination count={users?.meta?.last_page}
                            page={users?.meta?.current_page}
                            onChange={handlePageChange}
                            color="primary"/>
              </Grid>
            </>
          )
        )}
      </Paper>
    </>
  );
}
