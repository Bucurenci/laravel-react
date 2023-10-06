import {Outlet, Navigate} from 'react-router-dom';
import {useStateContext} from "../contexts/ContextProvider";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

export default function GuestLayout() {
  const {token} = useStateContext();

  if (token) {
    return <Navigate to="/"/>;
  }

  const defaultTheme = createTheme();

  defaultTheme.palette.background.default = defaultTheme.palette.primary.main;

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline/>
      <Outlet/>
    </ThemeProvider>
  );
}
