import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import App from './App';
import ErrorBoundary from './layouts/ErrorBoundary';
import { store } from './configs/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <ReduxProvider store={store}>
    <BrowserRouter>
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
          limit={1}
        />
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </ReduxProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
