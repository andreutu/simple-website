import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ProductsProvider } from "./context/ProductsContext.tsx";
import { FilterProvider } from "./context/FilterContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductsProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </ProductsProvider>
  </React.StrictMode>
);
