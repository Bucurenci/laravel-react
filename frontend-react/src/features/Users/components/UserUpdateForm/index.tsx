import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {UserUpdateSchema, UserUpdateType, IUser} from "../../../../models/User";
import {IUserFormErrors} from "../../../../models/ServerError";
import {Box, Button, FormControl, FormHelperText, Grid, TextField} from "@mui/material";

interface UserUpdateFormProps {
  user: IUser,
  serverErrors: IUserFormErrors | null,
  onUserUpdate: (formData: UserUpdateType) => void
}

export default function UserUpdateForm({user, serverErrors, onUserUpdate}: UserUpdateFormProps) {

  const {
    control,
    handleSubmit,
    setError,
    formState: {isSubmitting},
  } = useForm<UserUpdateType>({
    mode: 'onTouched',
    resolver: zodResolver(UserUpdateSchema), defaultValues: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: "",
      password_confirmation: "",
    }
  });

  useEffect(() => {

    if (serverErrors) {

      if (serverErrors.first_name) {
        setError("first_name", {type: "server", message: serverErrors.first_name[0]})
      }
      if (serverErrors.last_name) {
        setError("last_name", {type: "server", message: serverErrors.last_name[0]})
      }
      if (serverErrors.email) {
        setError("email", {type: "server", message: serverErrors.email[0]})
      }
      if (serverErrors.password) {
        setError("password", {type: "server", message: serverErrors.password[0]})
      }
      if (serverErrors.password_confirmation) {
        setError("password_confirmation", {type: "server", message: serverErrors.password_confirmation[0]})
      }
    }
  }, [serverErrors])

  const onSubmit = (data: UserUpdateType) => {
    onUserUpdate(data);
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}} autoComplete="off">
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
                  autoComplete="new-password"
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
                  autoComplete="new-password"
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
        sx={{mt: 3, mb: 3}}
      >
        Save
      </Button>
    </Box>
  );
}
