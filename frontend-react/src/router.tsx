import {createBrowserRouter, Navigate} from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import TodoList from "./pages/_TodoList";
import Settings from "./pages/Settings";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/Users";
import CreatePage from "./pages/Users/CreatePage";
import ListPage from "./pages/Users/ListPage";

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
        element: <ListPage/>
      },
      {
        path: '/users-create',
        element: <CreatePage/>
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
