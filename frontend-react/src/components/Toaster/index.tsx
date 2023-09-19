import {ReactNode} from "react";

interface ToasterProps {
  children: ReactNode,
}

export default function Toaster({children}: ToasterProps) {

  return (
    <div
      style={{minWidth: '25%', maxWidth: '50%'}}
      className="position-fixed top-0 end-0 alert alert-success fade show mt-2 me-4 z-2 shadow text-center"
      role="alert">
      {children}
    </div>
  );
}
