import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserCreateType, UserFormErrors} from "../../../models/User";
import {useStateContext} from "../../../contexts/ContextProvider";
import UserCreateForm from "../components/UserCreateForm";
import {Box, Grid, Paper, Typography} from "@mui/material";
import Loading from "../../../components/Loading";
import GoBackButton from "../../../components/GoBackButton";
import {useCreateUser} from "../../../hooks/Api/useCreateUser";

export default function UserCreate() {
  const {setNotification} = useStateContext();
  const [errors, setErrors] = useState<UserFormErrors | null>(null);
  const navigate = useNavigate();
  const {mutate: createUser, isLoading, isSuccess, error} = useCreateUser();

  const handleUserCreate = (userData: UserCreateType) => {
    createUser(userData);
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/users/list");
      setNotification("User was successfully created!");
    }

    if (error) {
      if (error.response.status === 422) {
        setErrors({...errors, ...error.response.data.errors})
      } else {
        setNotification("An unexpected error occurred... Please try again!", "error");
      }
    }
  }, [isSuccess, error]);

  return (
    <>
      <Grid container minHeight={75} display="flex" flexDirection="row"
            justifyContent="space-between" alignItems="top">
        <Box component="div">
          <Typography variant="h4" mb={0} gutterBottom>Create new user</Typography>

        </Box>
        <Box component="div">
          <GoBackButton>Go Back</GoBackButton>
        </Box>
      </Grid>

      <Paper sx={{position: "relative"}}>

        {isLoading ? (
          <Loading isLoading={true}/>
        ) : (
          <Grid container display="flex" justifyContent="center" sx={{p: {xs: 2, sm: 3, md: 4}}}>
            <Grid item xs={12} lg={9} xl={7}>
              <UserCreateForm serverErrors={errors} onUserCreate={handleUserCreate}/>
            </Grid>
          </Grid>
        )}
      </Paper>
    </>
  );
}
