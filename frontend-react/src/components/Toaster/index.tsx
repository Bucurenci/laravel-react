import React from "react";

export default function Toaster({children}) {

  return (
    <div
      className="alert alert-success position-absolute top-0 start-50 translate-middle-x fade show w-25 mt-2 z-2"
      role="alert">
      {children}
    </div>
  );
}
