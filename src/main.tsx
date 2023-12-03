import ReactDOM from 'react-dom/client';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import Layout from './layouts/Layout/Layout.tsx';
import Dashboard from './components/Dashboard/Dashboard.tsx';
import Controlled from './components/Controlled/Controlled.tsx';
import Uncontrolled from './components/Uncontrolled/Uncontrolled.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/controlled',
        element: <Controlled />,
      },
      {
        path: '/uncontrolled',
        element: <Uncontrolled />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
