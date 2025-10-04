import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../apis/ProductApis';

const Seller = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [stock, setStock] = useState(0);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFiles = (e) => {
    setFiles(Array.from(e.target.files));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title || !description || !price) return alert('Please fill required fields');
    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append("price[amount]", Number(price));
    form.append("price[currency]", currency);
    form.append('stock', String(stock));
    files.forEach((f) => form.append('images', f));
    console.log(form)

    try{
      setLoading(true);
      const res = await createProduct(form)
      setLoading(false);
      if(res){
        alert('Product created');
        navigate('/');
      }
    }catch(err){
      setLoading(false);
      console.error(err);
      alert('Error creating product');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-semibold mb-6">Create Product</h2>

        <form onSubmit={handleSubmit} enctype="multipart/form-data" className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} className="mt-1 block w-full border rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} className="mt-1 block w-full border rounded-lg px-3 py-2" rows={4} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input value={price} onChange={e=>setPrice(e.target.value)} type="number" className="mt-1 block w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Currency</label>
              <select value={currency} onChange={e=>setCurrency(e.target.value)} className="mt-1 block w-full border rounded-lg px-3 py-2">
                <option>INR</option>
                <option>USD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input value={stock} onChange={e=>setStock(e.target.value)} type="number" className="mt-1 block w-full border rounded-lg px-3 py-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Images (up to 5)</label>
            <input onChange={handleFiles} type="file" multiple accept="image/*" className="mt-1" />
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Seller;