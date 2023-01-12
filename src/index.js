import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./reducer/store";

import { persistStore } from "redux-persist"; // 추가
import { PersistGate } from "redux-persist/integration/react"; //추가

export let persistor = persistStore(store); // 추가

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
