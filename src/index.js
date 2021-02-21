import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import App from "App";
import "mocks";
import store from "redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
