import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import NotificationsMenu from "./NotificationsMenu";
import MessagesMenu from "./MessagesMenu";

interface INavbarProps {
  onDrawerToggle: () => void
}

export default function Navbar({onDrawerToggle}: INavbarProps) {

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="relative" sx={{
        width: `100%`,
        zIndex: (theme) => theme.zIndex.drawer + 15
      }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{mr: 2, display: {md: 'none'}}}
            onClick={onDrawerToggle}
          >
            <MenuIcon/>
          </IconButton>

          <Logo/>

          <SearchBar/>

          <Box sx={{flexGrow: 1}}/>

          <Box sx={{display: 'flex'}}>

            <MessagesMenu/>

            <NotificationsMenu/>

            <UserMenu/>

          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
