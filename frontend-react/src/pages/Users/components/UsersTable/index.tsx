import EditIcon from '@mui/icons-material/Edit';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import {useStateContext} from "../../../../contexts/ContextProvider";
import {UserUpdateType, User} from "../../../../models/User";
import {
  Avatar, Button,
  Fab, Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from "@mui/material";

interface UsersListProps {
  users: User[],
  onUserDelete: (id: number) => void,
  openUserUpdate: (u: UserUpdateType) => void,
}

export default function UsersTable({users, onUserDelete, openUserUpdate}: UsersListProps) {
  const {authUser} = useStateContext();

  return (
    <TableContainer>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Avatar</TableCell>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Created at</TableCell>
            <TableCell align="right" width={140}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell>{user.id}</TableCell>
              <TableCell>
                <Avatar sx={{width: 60, height: 60}} src={user.avatar?.thumb}>
                  {user.first_name.charAt(0).toUpperCase()}
                </Avatar>
              </TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.created_at}</TableCell>
              <TableCell align="right">

                <Stack direction="row" spacing={2}>

                  <Tooltip title="Edit User" placement="top">
                    <Button onClick={() => openUserUpdate(user)} variant="contained">
                      <EditIcon/>
                    </Button>
                  </Tooltip>

                  <Tooltip title="Delete User" placement="top">
                    <Button onClick={() => onUserDelete(user.id)} variant="contained" color="error">
                      <PersonOffIcon/>
                    </Button>
                  </Tooltip>

                </Stack>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
