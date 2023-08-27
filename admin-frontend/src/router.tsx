import {createBrowserRouter, Navigate} from "react-router-dom";
import AdminLayout from "./components/admin/AdminLayout";
import GuestLayout from "./components/guest/GuestLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import ForgotPassword from "./pages/ForgotPassword";
import UserForm from "./pages/UserForm";
import TodoList from "./pages/TodoList";

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
        element: <UserForm key="UserCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="UserUpdate" />
      },
      {
        path: '/todo-list',
        element: <TodoList />
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
