import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popup, setPopup] = useState(false);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();

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
      setPopup(true);
    } catch (err) {
      alert('Login failed');
    }
  };

  const redirectTo = (path) => {
    setPopup(false);
    navigate(path);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gaming Store</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {products.map(p => (
          <div key={p.id} className="border rounded p-4 shadow">
            <img src={`http://localhost:5000/uploads/${p.imageFile}`} alt={p.name} className="w-full h-40 object-cover mb-2" />
            <h2 className="font-semibold">{p.name}</h2>
            <p className="text-sm">{p.description}</p>
            <p className="text-green-600 font-bold">Ksh {p.price}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleLogin} className="max-w-md border p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-2 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>

      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow-lg text-center space-y-4">
            <h2 className="text-lg font-bold">Login successful</h2>
            <p>Select destination</p>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={() => redirectTo('/sales')}
            >
              Go to Sales
            </button>
            {role === 'admin' && (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => redirectTo('/products')}
              >
                Go to Products
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
