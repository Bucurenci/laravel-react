import React from 'react'
import {Outlet, Navigate} from 'react-router-dom';
import {useStateContext} from "../contexts/ContextProvider";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function AdminLayout() {
  const {token, notification} = useStateContext();

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <div id="page-top">
      <div id="wrapper">

        <Sidebar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">

            <Navbar />

            <div className="container-fluid">

              {notification &&
                <div className="alert alert-success fade show position-fixed top-4 end-0 me-4" role="alert">
                  {notification}
                </div>
              }

              <Outlet />

            </div>
          </div>

          <Footer />

        </div>
      </div>
    </div>
  );
}
