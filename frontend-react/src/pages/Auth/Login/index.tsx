import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  FormHelperText,
  FormControl, Paper, Divider
} from "@mui/material";
import {Link} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import {Controller, useForm} from "react-hook-form";
import {UserLoginSchema, UserLoginType} from "../../../models/User";
import {zodResolver} from "@hookform/resolvers/zod";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axiosClient from "../../../axios-client";

export default function LoginForm() {
  const {setAuthUser, setToken} = useStateContext();

  const {
    control,
    handleSubmit,
    setError,
    formState: {isSubmitting}
  } = useForm<UserLoginType>({
    mode: 'onTouched',
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = (data: UserLoginType) => {

    axiosClient.post('/login', data)
      .then(({data}) => {
        setAuthUser(data.user);
        setToken(data.token);

      })
      .catch(errorRes => {
        const response = errorRes.response;

        if (response && response.status === 422) {
          if (response.data.errors) {
            let errors = response.data.errors;

            if (errors.email) {
              setError("email", {type: "server", message: errors.email[0]})
            }
            if (errors.password) {
              setError("password", {type: "server", message: errors.password[0]})
            }
          } else if (response.data.message) {
            setError("password", {type: "server", message: response.data.message})
          }
        }
      })
  }

  return (
    <>
      <Paper sx={{
        maxWidth: "550px",
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({
                           field: {onChange, onBlur, ref},
                           fieldState: {error},
                         }) => (
                  <FormControl fullWidth>
                    <TextField
                      name="email"
                      id="email"
                      label="Email"
                      inputRef={ref}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={Boolean(error)}
                      autoComplete="email"
                      autoFocus
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
                name="password"
                control={control}
                render={({
                           field: {onChange, onBlur, ref},
                           fieldState: {error},
                         }) => (
                  <FormControl fullWidth>
                    <TextField
                      name="password"
                      type="password"
                      id="password"
                      label="Password"
                      inputRef={ref}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={Boolean(error)}
                      autoComplete="current-password"
                    />
                    <FormHelperText sx={{color: "red", mx: 0, mt: 1}}>
                      {error?.message ?? ''}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>

          <FormControlLabel
            control={<Checkbox value="remember" color="primary"/>}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 2, mb: 2}}
            disabled={isSubmitting}
          >
            Sign In
          </Button>

          <Divider sx={{mt: 1}}>
            <Link to="/signup" style={{textDecoration: "none"}}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Divider>
        </Box>
      </Paper>

      <Paper sx={{
        maxWidth: "550px",
        mt: 4,
        mx: {xs: 2, sm: "auto"},
        display: 'flex',
        flexDirection: "column",
        py: 2,
        px: {xs: 2, sm: 8},
        textAlign: "center"
      }}>
        <Divider sx={{my: 1}}>
          <Typography variant="body1">
            <strong>{"Demo credentials"}</strong>
          </Typography>
        </Divider>

        <Typography variant="body1">demo@pawland.shop</Typography>
        <Typography variant="body1">!Password123</Typography>
      </Paper>
    </>
  );
}
