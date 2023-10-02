import {Notification} from "../../models/Notification";
import {Alert, Snackbar, Stack} from "@mui/material";
import {SyntheticEvent, useState} from "react";

interface ToasterProps {
  notification: Notification
}

export default function Toaster({notification}: ToasterProps) {
  const [open, setOpen] = useState(Boolean(notification));

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (

    <Stack spacing={2} sx={{width: '100%'}}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity={notification.type} sx={{width: '100%'}}>
          {notification.content}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
