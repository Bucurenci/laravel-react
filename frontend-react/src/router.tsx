import {createBrowserRouter, Navigate} from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/Users";
import UsersCreatePage from "./pages/Users/Create";
import UsersListPage from "./pages/Users/List";
import SettingsPage from "./pages/Miscellaneous/Settings";
import TodosPage from "./pages/Miscellaneous/Todos";

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
        children: [
          {
            path: 'list',
            element: <UsersListPage/>
          },
          {
            path: 'create',
            element: <UsersCreatePage/>
          },
        ]
      },
      {
        path: '/todo-list',
        element: <TodosPage/>
      },
      {
        path: '/settings',
        element: <SettingsPage/>
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
