import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';

import ErrorBoundary from '@src/layouts/ErrorBoundary';
import { store } from '@src/configs/redux/store';
import { ToastContainer } from 'react-toastify';
import 'moment/locale/vi';

import 'react-toastify/dist/ReactToastify.css';
import '@src/styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <ErrorBoundary>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Component {...pageProps} />
      </ErrorBoundary>
    </ReduxProvider>
  );
}
export default MyApp;
