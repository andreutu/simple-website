import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, About, Products, SingleProduct, Error, CartPage } from "./pages";
import { Navbar, Sidebar, Footer } from "./components";

function App() {
	return (
		<Router>
			<Navbar />
			<Sidebar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/products" element={<Products />} />
				<Route path="/products/:id" element={<SingleProduct />} />
				<Route path="*" element={<Error />} />
				<Route path="/cart" element={<CartPage />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
