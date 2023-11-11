import { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, About, Products, SingleProduct, Error } from "./pages";
import { Navbar, Sidebar, Footer } from './components';
import { ProductsContext } from './context/ProductsContext';

import './css/App.css';

function App() {
  const [sidebar, setSidebar] = useState(false);
  const { isSidebarOpen } = useContext(ProductsContext);

  const handleOpenSidebar = () => {
    setSidebar(!sidebar);
  }

  return (
    <Router>
      <Navbar handleOpenSidebar={handleOpenSidebar}/>
      {isSidebarOpen && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/singleProduct" element={<SingleProduct />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App
