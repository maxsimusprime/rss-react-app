import ReactDOM from 'react-dom/client';
import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import App from './App.tsx';
import Details, { detailsLoader } from './components/Details/Details.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import NotFound from './components/NotFound/NotFound.tsx';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  const { worker } = await import('./mocks/browser');
  return worker.start();
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Details />} loader={detailsLoader} />
      </Route>
      ,
      <Route path="*" element={<NotFound />} />
    </>
  )
);

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </React.StrictMode>
  );
});
