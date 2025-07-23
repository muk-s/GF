import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function SalesPage() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [report, setReport] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    axios.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));

    if (role === 'admin') {
      axios.get('/sales/report')
        .then(res => setReport(res.data))
        .catch(err => console.error(err));
    }
  }, [role]);

  const submitSale = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/sales', {
        productId,
        quantity: Number(quantity),
      });
      alert('Sale recorded');
      setProductId('');
      setQuantity(1);

      if (role === 'admin') {
        const updated = await axios.get('/sales/report');
        setReport(updated.data);
      }
    } catch (err) {
      alert('Sale failed');
    }
  };

  const chartData = {
    labels: report.map(r => r.product),
    datasets: [{
      label: 'Sales Total (Ksh)',
      data: report.map(r => r.total),
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
    }]
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Record a Sale</h1>

      <form onSubmit={submitSale} className="flex gap-4 items-end mb-6">
        <select
          className="border p-2 rounded w-60"
          value={productId}
          onChange={e => setProductId(e.target.value)}
          required
        >
          <option value="">Select Product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <input
          type="number"
          className="border p-2 rounded w-32"
          min="1"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {role === 'admin' && report.length > 0 && (
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold mb-2">Sales Report</h2>
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
}

export default SalesPage;
