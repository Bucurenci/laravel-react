import {createBrowserRouter, Navigate} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import GuestLayout from "./layouts/GuestLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import ForgotPassword from "./pages/ForgotPassword";
import TodoList from "./pages/_TodoList";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to='/users'/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/todo-list',
        element: <TodoList/>
      },
      {
        path: '/settings',
        element: <Settings/>
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword/>
      }
    ]
  },
  {
    path: '*',
    element: <NotFound/>
  }
]);

export default router;
