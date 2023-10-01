import {Notification} from "../../models/Notification";
import {Alert} from "@mui/material";

interface ToasterProps {
  notification: Notification
}

export default function Toaster({notification}: ToasterProps) {

  return (
    <Alert variant="filled" severity={notification.type} sx={{mb: 3}}>
      {notification.content}
    </Alert>
  );
}
