import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { Provider } from 'react-redux';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { CLOSE_TIME } from '../shared/lib/const/const';
import { appStore } from './app-store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={appStore} >
      <ToastContainer transition={Zoom} autoClose={CLOSE_TIME} />
      <App />
    </Provider>
  </React.StrictMode>
);
