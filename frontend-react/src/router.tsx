import {createBrowserRouter, Navigate} from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import Login from "./pages/Auth/pages/Login";
import Signup from "./pages/Auth/pages/Signup";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/Auth/pages/ForgotPassword";
import TodoList from "./pages/Miscellaneous/pages/_TodoList";
import Settings from "./pages/Miscellaneous/pages/Settings";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/Users";
import UsersCreatePage from "./pages/Users/pages/Create";
import UsersListPage from "./pages/Users/pages/List";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard"/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/users',
        element: <UsersPage/>,
      },
      {
        path: '/users-list',
        element: <UsersListPage/>
      },
      {
        path: '/users-create',
        element: <UsersCreatePage/>
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
