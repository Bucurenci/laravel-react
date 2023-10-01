import {useState} from 'react';
import {useStateContext} from "../contexts/ContextProvider";
import Drawer from '@mui/material/Drawer';
import {Box, CssBaseline, createTheme, ThemeProvider} from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import {Navigate, Outlet} from "react-router-dom";
import Toaster from "../components/Toaster";

export default function AdminLayout() {
  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = useState(false);
  const {token, notification} = useStateContext();

  if (!token) {
    return <Navigate to="/login"/>
  }

  const adminTheme = createTheme({
    mixins: {
      toolbar: {
        minHeight: 75,
        '@media (min-width:600px)': {minHeight: 75}
      }
    }
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline/>
      <Box>

        <Navbar onDrawerToggle={handleDrawerToggle}/>

        <Box sx={{
          display: 'flex',
          overflow: 'hidden',
          height: (theme) => `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`
        }}>
          <Box
            component="nav"
            sx={{
              width: {md: drawerWidth},
              overflowX: 'hidden',
              overflowY: 'auto',
              flexShrink: {md: 0}
            }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: {xs: 'block', md: 'none'},
                height: (theme) => `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
                mt: (theme) => `${theme.mixins.toolbar.minHeight}px`,
                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth, position: "relative"}
              }}
            >
              <Sidebar/>
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: {xs: 'none', md: 'block'},
                height: '100%',
                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth, position: "relative"},
              }}
              open={mobileOpen}
            >
              <Sidebar/>
            </Drawer>
          </Box>
          {/* The Main Content */}
          <Box component="main"
               sx={{
                 flexGrow: 1,
                 px: {xs: 2, lg: 5},
                 py: {xs: 4, lg: 5},
                 overflowY: 'auto',
                 width: {md: `calc(100% - ${drawerWidth}px)`}
               }}
          >
            {notification && <Toaster notification={notification}/>}

            <Outlet/>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
