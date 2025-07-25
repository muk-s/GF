import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border p-4 shadow-md bg-white dark:bg-zinc-900">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-600">Quantity: {item.qty}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-semibold">Ksh {item.price * item.qty}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold">Total: Ksh {total}</h2>
            <Link to="/checkout">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-green-700 transition-colors duration-300">
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
