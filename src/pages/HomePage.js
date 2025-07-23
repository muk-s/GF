import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useCart } from '../context/CartContext';

function HomePage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-primary">Our Products</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
            <img src={`http://localhost:5000/uploads/${product.imageFile}`} alt={product.name} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-primary">{product.name}</h2>
              <p className="text-accent mb-4 h-20 overflow-y-auto">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-2xl font-bold text-green-600">Ksh {product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 text-white font-bold px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
