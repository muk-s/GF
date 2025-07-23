import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductPage';
import SalesPage from './pages/SalesPage';
import CheckoutPage from './pages/CheckoutPage';
import RequireAuth from './components/RequireContext';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
      </Routes>
    </Router>
  );
}

export default App;
