import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CheckoutPage() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const handleCheckout = async () => {
    if (cart.length === 0) return alert('Cart is empty');

    setLoading(true);
    const amount = cart.reduce((sum, item) => sum + item.qty * item.actualPrice, 0);

    try {
      // 1. M-Pesa STK push
      await axios.post('/payments/mpesa/checkout', { phone, amount });

      alert('Payment initiated. Confirm on your phone.');

      // 2. Place order
      const items = cart.map(({ id, qty }) => ({ id, qty }));
      await axios.post('/orders', { items });

      cart.forEach(item => removeFromCart(item.id));
      alert('Order placed successfully.');
      navigate('/');
    } catch (err) {
      alert('Checkout failed. ' + err?.response?.data?.error || '');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">No items in cart</p>
      ) : (
        <>
          <ul className="mb-4 space-y-2">
            {cart.map((item, idx) => (
              <li key={idx} className="flex justify-between border-b pb-1">
                <span>{item.name} x {item.qty}</span>
                <span>Ksh {item.qty * item.actualPrice}</span>
              </li>
            ))}
          </ul>

          <div className="mb-4 font-semibold">
            Total: Ksh {cart.reduce((sum, i) => sum + i.qty * i.actualPrice, 0)}
          </div>

          <input
            type="text"
            className="border p-2 w-full mb-3"
            placeholder="Safaricom Number e.g. 0712XXXXXX"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="bg-green-600 text-white py-2 px-4 w-full rounded disabled:opacity-60"
          >
            {loading ? 'Processing...' : 'Pay with M-Pesa & Place Order'}
          </button>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;
