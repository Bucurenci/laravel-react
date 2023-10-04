import {useParams} from "react-router-dom"
import UserUpdate from "../../../features/Users/UserUpdate";
import {Alert, Paper, Link} from "@mui/material";

export default function UsersUpdatePage() {
  const {userId} = useParams();

  if (userId) {
    let intUserId = parseInt(userId);

    if (isNaN(intUserId)) {

      return (
        <Paper sx={{position: "relative", p: 2}}>

          <Alert severity="error">
            User with id "{userId}" does not exist.
            <Link href="/users/list">Return to the user list</Link>
          </Alert>
        </Paper>

      )
    }

    return (
      <UserUpdate userId={intUserId}/>
    );
  }
}
