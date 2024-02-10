import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ProductsProvider } from "./context/ProductsContext.tsx";
import { FilterProvider } from "./context/FilterContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ProductsProvider>
			<FilterProvider>
				<CartProvider>
					<App />
				</CartProvider>
			</FilterProvider>
		</ProductsProvider>
	</React.StrictMode>,
);
