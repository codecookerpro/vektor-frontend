import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import App from 'App';
import store from 'redux/store';
import InitProvider from 'utils/hocs/InitProvider'
import InterceptorProvider from 'utils/hocs/InterceptorProvider'

ReactDOM.render(
  <Provider store={store}>
    <InitProvider />
    <InterceptorProvider />
    <App />
  </Provider>,
  document.getElementById('root')
);
