import {Outlet, Navigate} from 'react-router-dom';
import {useStateContext} from "../../contexts/ContextProvider";

export default function GuestLayout() {

  const {token} = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-gradient-primary min-vh-100">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-6 col-md-9">


            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">

                <Outlet/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
