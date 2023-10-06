import {FormEvent} from "react";
import {Link} from "react-router-dom";
import {Avatar, Button, Divider, Grid, Paper, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function ForgotPassword() {

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
  }

  return (
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
        Forgot Your Password?
      </Typography>
      <form onSubmit={onSubmit} className="user">

        <div>
          <p>We get it, stuff happens. Just enter your email address below
            and we'll send you a link to reset your password!</p>
        </div>

        <TextField fullWidth name="email" label="email"/>

        <Button type="submit" fullWidth variant="contained" sx={{mt: 2, mb: 2}}>
          Reset Password
        </Button>

        <Divider sx={{mb: 3}}/>

        <Grid container justifyContent="flex-end">
          <Link to="/signup" style={{textDecoration: "none"}}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Link to="/login" style={{textDecoration: "none"}}>
            {"Already have an account? Login!"}
          </Link>
        </Grid>
      </form>
    </Paper>
  );
}
