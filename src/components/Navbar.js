import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();
  return (
    <nav className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          MyShop
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:underline" onClick={() => navigate('/')}>
            Home
          </Link>
          <Link to="/cart" className="hover:underline" onClick={() => navigate('/cart')}>
            Cart ({cart.length})
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
