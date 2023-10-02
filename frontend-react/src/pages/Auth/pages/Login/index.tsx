import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  FormHelperText,
  FormControl
} from "@mui/material";
import {useStateContext} from "../../../../contexts/ContextProvider";
import {Controller, useForm} from "react-hook-form";
import {UserLoginSchema, UserLoginType} from "../../../../models/User";
import {zodResolver} from "@hookform/resolvers/zod";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axiosClient from "../../../../axios-client";

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
    <Box px={8} sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
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
        <Grid container justifyContent="flex-end">
          <Link href="/Signup">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Box>
    </Box>
  );
}
