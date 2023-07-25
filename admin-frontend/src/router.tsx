import {createBrowserRouter, Navigate} from "react-router-dom";
import AdminLayout from "./components/admin/AdminLayout";
import GuestLayout from "./components/guest/GuestLayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import Users from "./views/Users";
import ForgotPassword from "./views/ForgotPassword";
import UserForm from "./views/UserForm";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/dashboard' />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/users/add',
        element: <UserForm key="UserCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="UserUpdate" />
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;
