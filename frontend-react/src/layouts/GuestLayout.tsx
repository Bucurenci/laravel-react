import {Outlet, Navigate} from 'react-router-dom';
import {useStateContext} from "../contexts/ContextProvider";
import {Box, Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";

export default function GuestLayout() {
  const {token} = useStateContext();
  const defaultTheme = createTheme();

  if (token) {
    return <Navigate to="/"/>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Outlet/>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
