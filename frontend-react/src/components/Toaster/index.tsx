import {Notification} from "../../contexts/ContextProvider";

interface ToasterProps {
  notification: Notification
}

export default function Toaster({notification}: ToasterProps) {

  return (
    <div
      style={{minWidth: '25%', maxWidth: '50%'}}
      className={`position-fixed top-0 end-0 alert alert-${notification.type} fade show mt-2 me-4 z-2 shadow text-center`}
      role="alert">
      {notification.content}
    </div>
  );
}
