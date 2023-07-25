import React from 'react'
import {Outlet, Navigate} from 'react-router-dom';
import {useStateContext} from "../../contexts/ContextProvider";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function AdminLayout() {
  const {user, token} = useStateContext();

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

              <Outlet />

            </div>
          </div>

          <Footer />

        </div>
      </div>
    </div>
  );
}
