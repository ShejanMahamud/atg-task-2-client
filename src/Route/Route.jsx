import React from 'react';
import {
  createBrowserRouter
} from "react-router-dom";
import RootLayout from '../layouts/RootLayout';
import ForgetPassword from '../pages/Auth/ForgetPassword';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
  
const Route = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout/>,
      children: [
        {
          path: '',
          element: <Home/>
        }
      ],
      errorElement: <NotFound/>
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/register',
      element: <Register/>
    },
    {
      path: '/forget_password',
      element: <ForgetPassword/>
    }
  ]);

export default Route