import React from "react";

export default function Toaster({children}) {

  return (
    <div className="alert alert-success fade show position-absolute w-25 top-4 end-0 me-4 z-2 text-center" role="alert">
      {children}
    </div>
  );
}
