import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LogOut, Package, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const { products, addProduct, removeProduct, logoutAdmin, isAdminAuthenticated } = useStore();
  const navigate = useNavigate();
  
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '', description: '' });

  if (!isAdminAuthenticated) {
    navigate('/admin');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) return;

    addProduct({
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      image: newProduct.image,
      category: 'General',
      description: newProduct.description
    });
    setNewProduct({ name: '', price: '', image: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Package className="text-blue-500" /> Painel Admin
          </h1>
          <button onClick={() => { logoutAdmin(); navigate('/'); }} className="flex items-center gap-2 text-slate-400 hover:text-red-400">
            <LogOut size={20} /> Sair
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-bold mb-6 text-blue-400">Adicionar Produto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Nome" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" />
              <input type="number" placeholder="Preço" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" />
              <input type="text" placeholder="URL da Imagem" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" />
              <button type="submit" className="w-full bg-blue-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2"><Plus size={20} /> Adicionar</button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800"><h2 className="text-xl font-bold">Produtos Ativos ({products.length})</h2></div>
            <div className="divide-y divide-slate-800">
              {products.map(p => (
                <div key={p.id} className="p-4 flex items-center gap-4">
                  <img src={p.image} className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1 font-bold">{p.name} - €{p.price.toFixed(2)}</div>
                  <button onClick={() => removeProduct(p.id)} className="text-red-500"><Trash2 size={20} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};