import React from 'react'
import {Outlet, Navigate} from 'react-router-dom';
import {useStateContext} from "../contexts/ContextProvider";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Toaster from "../components/Toaster";

export default function AdminLayout() {
  const {token, notification} = useStateContext();

  if (!token) {
    return <Navigate to="/login"/>
  }

  return (
    <div id="page-top">
      <div id="wrapper">

        <Sidebar/>

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">

            <Navbar/>

            <div className="container-fluid">

              {notification && <Toaster>{notification}</Toaster>}

              <Outlet/>

            </div>
          </div>

          <Footer/>

        </div>
      </div>
    </div>
  );
}
