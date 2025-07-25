import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductPage';
import SalesPage from './pages/SalesPage';
import CheckoutPage from './pages/CheckoutPage';
import RequireAuth from './components/RequireContext';
import HomePage from './pages/HomePage';
import Cart from './components/Cart';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={
            <RequireAuth role="admin">
              <ProductsPage />
            </RequireAuth>
          } />
          <Route path="/sales" element={
            <RequireAuth>
              <SalesPage />
            </RequireAuth>
          } />
          <Route path="/checkout" element={
            <RequireAuth>
              <CheckoutPage />
            </RequireAuth>
          } />
          <Route path="/cart" element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
