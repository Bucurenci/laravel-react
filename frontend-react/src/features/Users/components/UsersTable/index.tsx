import EditIcon from '@mui/icons-material/Edit';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import {User} from "../../../../models/User";
import {useStateContext} from "../../../../contexts/ContextProvider";
import {
  Avatar, Button,
  Stack,
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
  onUserUpdate: (id: number) => void
}

export default function UsersTable({users, onUserDelete, onUserUpdate}: UsersListProps) {
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
            <TableRow key={user.id} hover
            >
              <TableCell>{user.id}</TableCell>
              <TableCell>
                <Avatar sx={{width: 50, height: 50}} src={user.avatar?.thumb}>
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
                    <Button onClick={() => onUserUpdate(user.id)} variant="contained"
                            sx={{minWidth: 45, px: 0}}>
                      <EditIcon/>
                    </Button>
                  </Tooltip>

                  {user.id !== authUser?.id && (
                    <Tooltip title="Delete User" placement="top">
                      <Button onClick={() => onUserDelete(user.id)} variant="contained" color="error"
                              sx={{minWidth: 45, px: 0}}>
                        <PersonOffIcon/>
                      </Button>
                    </Tooltip>
                  )}

                </Stack>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
