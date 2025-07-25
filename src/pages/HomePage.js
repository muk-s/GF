import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useCart } from '../context/CartContext';
import HeroSection from '../components/HeroSection';

function HomePage() {
  const [products, setProducts] = useState([]);

  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen width-full">
      <HeroSection />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-primary">Our Products</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <img
              src={`https://back-gf-production.up.railway.app/uploads/${product.imageFile}`}
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
    </div>
  );
}

export default HomePage;
