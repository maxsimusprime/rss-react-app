import ReactDOM from 'react-dom/client';
import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import App from './App.tsx';
import Details from './components/Details/Details.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import NotFound from './components/NotFound/NotFound.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Details />} />
      </Route>
      ,
      <Route path="*" element={<NotFound />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
