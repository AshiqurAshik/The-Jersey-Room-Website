import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Home from './Pages/Home/Home';
import Root from './Pages/Root/Root';
import Products from './Pages/Products/Products';
import Cart from './Pages/Cart/Cart';
import Details from './Pages/Details/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: '/products',
        Component: Products,
      },
      {
        path: '/products/:id',
        Component: Details,
      },

      {
        path: '/cart',
        Component: Cart,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
