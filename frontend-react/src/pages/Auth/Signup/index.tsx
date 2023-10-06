import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  FormHelperText,
  FormControl, Paper, Divider,
} from "@mui/material";
import {Link} from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useStateContext} from "../../../contexts/ContextProvider";
import {useForm, Controller} from "react-hook-form";
import {UserCreateSchema, UserCreateType} from "../../../models/User";
import {zodResolver} from "@hookform/resolvers/zod";
import axiosClient from "../../../axios-client";

export default function RegisterForm() {
  const {setAuthUser, setToken} = useStateContext();

  const {
    control,
    handleSubmit,
    setError,
    formState: {isSubmitting}
  } = useForm<UserCreateType>({
    mode: 'onTouched',
    resolver: zodResolver(UserCreateSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  const onSubmit = (data: any) => {

    axiosClient.post('/signup', data)
      .then(({data}) => {
        setAuthUser(data.user);
        setToken(data.token);
      })
      .catch(error => {
        let response = error.response;

        if (response && response.status === 422) {
          let errors = response.data.errors;

          if (errors.first_name) {
            setError("first_name", {type: "server", message: errors.first_name[0]})
          }
          if (errors.last_name) {
            setError("last_name", {type: "server", message: errors.last_name[0]})
          }
          if (errors.email) {
            setError("email", {type: "server", message: errors.email[0]})
          }
          if (errors.password) {
            setError("password", {type: "server", message: errors.password[0]})
          }
          if (errors.password_confirmation) {
            setError("password_confirmation", {type: "server", message: errors.password_confirmation[0]})
          }
        }
      })
  };

  return (
    <Paper sx={{
      maxWidth: '700px',
      mt: 14,
      mx: {xs: 2, sm: "auto"},
      display: 'flex',
      flexDirection: "column",
      alignItems: "center",
      py: {xs: 2, sm: 4},
      px: {xs: 4, sm: 8},
    }}>
      <Avatar sx={{m: 1, color: 'primary.main', bgcolor: 'grey.300'}}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="first_name"
              control={control}
              render={({
                         field: {value, onChange, onBlur, ref},
                         fieldState: {error},
                       }) => (
                <FormControl fullWidth>
                  <TextField
                    name="first_name"
                    label="First name"
                    inputRef={ref}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(error)}
                  />
                  <FormHelperText sx={{color: "red", mx: 0, mt: 1}}>
                    {error?.message ?? ''}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="last_name"
              control={control}
              render={({
                         field: {value, onChange, onBlur, ref},
                         fieldState: {error},
                       }) => (
                <FormControl fullWidth>
                  <TextField
                    name="last_name"
                    label="Last name"
                    inputRef={ref}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(error)}
                  />
                  <FormHelperText sx={{color: "red", mx: 0, mt: 1}}>
                    {error?.message ?? ''}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              render={({
                         field: {value, onChange, onBlur, ref},
                         fieldState: {error},
                       }) => (
                <FormControl fullWidth>
                  <TextField
                    name="email"
                    label="Email"
                    inputRef={ref}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(error)}
                  />
                  <FormHelperText sx={{color: "red", mx: 0, mt: 1}}>
                    {error?.message ?? ''}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="password"
              control={control}
              render={({
                         field: {value, onChange, onBlur, ref},
                         fieldState: {error},
                       }) => (
                <FormControl fullWidth>
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    inputRef={ref}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(error)}
                  />
                  <FormHelperText sx={{color: "red", mx: 0, mt: 1}}>
                    {error?.message ?? ''}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>

            <Controller
              name="password_confirmation"
              control={control}
              render={({
                         field: {value, onChange, onBlur, ref},
                         fieldState: {error},
                       }) => (
                <FormControl fullWidth>
                  <TextField
                    name="password_confirmation"
                    label="Confirm password"
                    type="password"
                    inputRef={ref}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(error)}
                  />
                  <FormHelperText sx={{color: "red", mx: 0, mt: 1}}>
                    {error?.message ?? ''}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isSubmitting}
          sx={{mt: 3, mb: 2}}
        >
          Sign Up
        </Button>

        <Divider sx={{mt: 1}}>
          <Link to="/login" style={{textDecoration: "none"}}>
            Already have an account? Login!
          </Link>
        </Divider>
      </Box>
    </Paper>
  );
}
