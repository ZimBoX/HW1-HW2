import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import reportWebVitals from './reportWebVitals';

import Main from './router/Main/Main';
import HW1 from './router/HW1/HW1';

import HW2 from './router/HW2/HW2';
import HomePage from './router/HW2/HomePage/HomePage';
import Galery from './router/HW2/Galery/Galery';
import Login from './router/HW2/Login/Login';
import Registration from './router/HW2/Registration/Registration';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/HW1",
    element: <HW1 />,
  },
  {
    path: "/HW2",
    element: <HW2 />,
    children: [{
      path: "/HW2/HomePage",
      element: <HomePage />
    },
    {
      path: "/HW2/Galery",
      element: <Galery />
    },
    {
      path: "/HW2/Login",
      element: <Login />
    },
    {
      path: "/HW2/Registration",
      element: <Registration />
    },
  ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
