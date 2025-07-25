import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import axios from '../api/axios';

function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [popup, setPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password });
      const token = res.data.token;
      const decoded = JSON.parse(atob(token.split('.')[1]));

      localStorage.setItem('token', token);
      localStorage.setItem('role', decoded.role);
      setPopup(false);
      setTimeout(() => navigate(decoded.role === 'admin' ? '/products' : '/sales'), 300);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <>
      <nav className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            MyShop
          </Link>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/')} className="hover:underline">
              Home
            </button>
            <button onClick={() => navigate('/cart')} className="hover:underline">
              Cart ({cart.length})
            </button>
            <button
              onClick={() => setPopup(true)}
              className="bg-white text-primary px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-3 border rounded"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 mb-3 border rounded"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setPopup(false)}
                className="w-full mt-2 text-sm text-gray-600 underline"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;

