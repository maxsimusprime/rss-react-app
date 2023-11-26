import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '@/store/store';
import { FC } from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from '@/ErrorBoundary';

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
