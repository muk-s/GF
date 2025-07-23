import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [popup, setPopup] = useState(false);
  const [role, setRole] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password });
      const token = res.data.token;
      const decoded = JSON.parse(atob(token.split('.')[1]));

      localStorage.setItem('token', token);
      localStorage.setItem('role', decoded.role);
      setRole(decoded.role);
      setPopup(false); // close modal on login
      setTimeout(() => navigate(decoded.role === 'admin' ? '/products' : '/sales'), 300);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-primary">Gaming Store</h1>
        <button
          onClick={() => setPopup(true)}
          className="bg-blue-600 text-white font-bold px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <img
              src={`http://localhost:5000/uploads/${product.imageFile}`}
              alt={product.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-primary">{product.name}</h2>
              <p className="text-accent mb-4 h-20 overflow-y-auto">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm line-through text-red-500">Ksh {product.price}</p>
                <p className="text-2xl font-bold text-green-600">Ksh {product.actualPrice}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-600 text-white font-bold px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 mt-4"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Login Popup Modal */}
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
    </div>
  );
}

export default HomePage;
