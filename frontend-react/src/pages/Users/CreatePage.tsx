import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserCreateType, UserFormErrors} from "../../models/User";
import axiosClient from "../../axios-client";
import {useStateContext} from "../../contexts/ContextProvider";
import UserCreateForm from "./components/UserCreateForm";
import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';

export default function CreatePage() {
  const {setNotification} = useStateContext();
  const [errors, setErrors] = useState<UserFormErrors | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  const handleUserCreate = (userData: UserCreateType) => {
    setLoading(true);

    axiosClient.post(`/users`, userData)
      .then(() => {
        setLoading(false);
        navigate("/users-list");
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

  return (
    <>
      <Grid container minHeight={75} display="flex" flexDirection="row"
            justifyContent="space-between" alignItems="top">
        <Box component="div">
          <Typography variant="h4" mb={0} gutterBottom>Create new user</Typography>

        </Box>
        <Box component="div">
          <Button onClick={() => navigate("/users-list")} variant="contained" size="large"
                  startIcon={<ReplyIcon/>} sx={{mb: {xs: 3, sm: 0}, mt: {xs: 2, sm: 0}}}>
            Back to users
          </Button>
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


        <Grid container display="flex" justifyContent="center" sx={{p: {xs: 2, sm: 3, md: 4}}}>
          <Grid item xs={12} lg={9} xl={7}>
            <UserCreateForm serverErrors={errors} onUserCreate={handleUserCreate}/>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
