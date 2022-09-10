import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./app/store";
import { Provider } from "react-redux";

import "./index.css";
import App from "./app/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <Provider store={store}>
      {/* <React.StrictMode> */}

      <App />
      {/* </React.StrictMode> */}
   </Provider>
);
