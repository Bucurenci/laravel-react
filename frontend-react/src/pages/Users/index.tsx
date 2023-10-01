import {Outlet} from "react-router-dom";

export default function UsersPage() {

  return (
    <>
      <h1 className="text-center">This is the Users Page</h1>
      <Outlet/>
    </>
  );
}
