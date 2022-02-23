import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ProductsProvider } from "./context/ProductsContext";

ReactDOM.render(
  <ProductsProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ProductsProvider>,
  document.getElementById("root")
);
