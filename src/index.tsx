import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'modules/app/App';
import reportWebVitals from './libs/reportWebVitals';

import 'material-icons/iconfont/material-icons.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (process.env.REACT_APP_LOG_MEASUREMENT === 'true') {
  reportWebVitals();
}
