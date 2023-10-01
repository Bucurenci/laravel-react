import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useStateContext} from "../../../../contexts/ContextProvider";
import {UserUpdateType, User} from "../../../../models/User";
import {
  Avatar,
  Fab,
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
            <TableRow
              key={user.id}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell>{user.id}</TableCell>
              <TableCell>
                <Avatar sx={{width: 50, height: 50}} src={authUser?.avatar?.thumb}>
                  {authUser?.first_name.charAt(0).toUpperCase()}
                </Avatar>
              </TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.created_at}</TableCell>
              <TableCell align="right">

                <Tooltip title="Edit User" placement="top">
                  <Fab onClick={() => openUserUpdate(user)} size="small" color="primary" sx={{mr: 1}}
                       aria-label="edit">
                    <EditIcon/>
                  </Fab>
                </Tooltip>

                <Tooltip title="Delete User" placement="top">
                  <Fab onClick={() => onUserDelete(user.id)} size="small" color="secondary" aria-label="add">
                    <DeleteForeverIcon/>
                  </Fab>
                </Tooltip>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
