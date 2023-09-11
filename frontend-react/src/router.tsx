import {createBrowserRouter, Navigate} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import GuestLayout from "./layouts/GuestLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import ForgotPassword from "./pages/ForgotPassword";
import UserCreateUpdate from "./pages/UserCreateUpdate";
import TodoList from "./pages/TodoList";
import UseLoaderHook, {dogData} from "./pages/UseLoaderHook";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/users' />
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
        element: <UserCreateUpdate key="UserCreate" />
      },
      {
        path: '/users/:id',
        element: <UserCreateUpdate key="UserUpdate" />
      },
      {
        path: '/todo-list',
        element: <TodoList />
      },
      {
        path: '/use-loader',
        element: <UseLoaderHook />,
        loader: dogData
      },
      {
        path: '/settings',
        element: <Settings />
      },
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
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;
