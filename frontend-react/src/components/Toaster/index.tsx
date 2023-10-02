import {Notification} from "../../models/Notification";
import {Alert, Snackbar, Stack} from "@mui/material";
import {useState} from "react";

interface ToasterProps {
  notification: Notification
}

export default function Toaster({notification}: ToasterProps) {
  const [open, setOpen] = useState(Boolean(notification?.content));

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <Stack spacing={2} sx={{width: '100%'}}>
      <Snackbar open={open}>
        <Alert variant="filled" onClose={handleClose} severity={notification.type} sx={{width: '100%'}}>
          {notification.content}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
