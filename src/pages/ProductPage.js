import { useEffect, useState } from 'react';
import axios from '../api/axios';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', actualPrice: '', description: '', imageFile: null });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = () => {
    axios.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setForm({ ...form, imageFile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));

    try {
      if (editingId) {
        await axios.put(`/products/${editingId}`, data);
      } else {
        await axios.post('/products', data);
      }
      setForm({ name: '', price: '', actualPrice: '', description: '', imageFile: null });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      alert('Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      actualPrice: product.actualPrice,
      description: product.description,
      imageFile: null,
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      <form onSubmit={handleSubmit} className="grid gap-2 max-w-md mb-6">
        <input name="name" placeholder="Name" className="border p-2" value={form.name} onChange={handleChange} required />
        <input name="price" placeholder="Price" type="number" className="border p-2" value={form.price} onChange={handleChange} required />
        <input name="actualPrice" placeholder="Actual Price" type="number" className="border p-2" value={form.actualPrice} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" className="border p-2" value={form.description} onChange={handleChange} required />
        <input name="imageFile" type="file" className="border p-2" onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          {editingId ? 'Update' : 'Create'} Product
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border rounded p-4 shadow relative">
            <img src={`http://localhost:5000/uploads/${product.imageFile}`} alt={product.name} className="w-full h-40 object-cover mb-2" />
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-green-700 font-bold">Ksh {product.price}</p>
            <div className="flex justify-between mt-2">
              <button onClick={() => handleEdit(product)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
