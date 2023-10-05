import {
  Avatar, Button,
  Dialog, DialogContent,
  DialogTitle, Divider, Grid,
  IconButton, List,
  ListItem, ListItemButton,
  ListItemText, Paper,
  Stack, Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useUsersData} from "../../../hooks/Api/useUsersData";
import Loading from "../../../components/Loading";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {User} from "../../../models/User";

export default function LastUsersAdded() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const {data: lastUsers, isLoading} = useUsersData({page: 1});

  const handleClickUser = (user: User) => {
    setSelectedUser(user);
    setShowDialog(true);
  }

  return (
    <Paper>

      {isLoading ? (
        <Loading isLoading={true}/>
      ) : (
        <>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem>
              <Typography variant="h5">Last users added</Typography>
            </ListItem>
          </List>
          <Divider/>
          <List component="nav" aria-label="secondary mailbox folder">
            {lastUsers && lastUsers.data.map((user) => (
              <ListItemButton key={user.id}
                              onClick={() => handleClickUser(user)}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{width: 50, height: 50}} src={user.avatar?.thumb}>
                    {user.first_name.charAt(0).toUpperCase()}
                  </Avatar>
                  <ListItemText primary={`${user.first_name} ${user.last_name}`}/>
                </Stack>
              </ListItemButton>
            ))}
          </List>
          <Stack direction="row" spacing={3} justifyContent="center" py={3}>
            <Button variant="contained" onClick={() => navigate("/users/list")}>See all users</Button>
          </Stack>
        </>
      )}
      {selectedUser && (
        <Dialog
          onClose={() => setShowDialog(false)}
          aria-labelledby="selected-users-details"
          open={showDialog}
          maxWidth="lg"

        >
          <DialogTitle sx={{m: 0, p: 2}}>
            {selectedUser.first_name} {selectedUser.last_name}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setShowDialog(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon/>
          </IconButton>
          <DialogContent dividers sx={{p: 0}}>

            <List sx={{bgcolor: 'background.paper'}}>
              <ListItem>
                <Grid container alignItems="center" sx={{minWidth: '360px', maxWidth: '100%'}}>
                  <Grid item xs={12} sm={4}>
                    <Avatar sx={{width: 100, height: 100, my: 2, textAlign: {xs: 'center'}}}
                            src={selectedUser.avatar?.thumb}>
                      {selectedUser.first_name.charAt(0).toUpperCase()}
                    </Avatar>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography><strong>First name: </strong>{selectedUser.first_name}</Typography>
                    <Typography><strong>Last name: </strong>{selectedUser.last_name}</Typography>
                    <Typography><strong>Email: </strong>{selectedUser.email}</Typography>
                    <Typography><strong>Created at: </strong>{selectedUser.created_at}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </DialogContent>
        </Dialog>
      )}
    </Paper>
  );
}
