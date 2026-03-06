import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, Plus, LogOut, Package, Settings, Image as ImageIcon, MessageSquare, CheckCircle, Send, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const { products, addProduct, removeProduct, logoutAdmin, isAdminAuthenticated, logoUrl, updateLogo, heroBackgroundUrl, updateHeroBackground, tickets, closeTicket, replyToTicket } = useStore();
  const navigate = useNavigate();
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [adminReply, setAdminReply] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '', description: '' });
  const [logoInput, setLogoInput] = useState(logoUrl);
  const [bgInput, setBgInput] = useState(heroBackgroundUrl);

  React.useEffect(() => {
    if (!isAdminAuthenticated) { navigate('/admin'); }
  }, [isAdminAuthenticated, navigate]);

  if (!isAdminAuthenticated) { return null; }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) return;
    addProduct({ id: Date.now().toString(), name: newProduct.name, price: parseFloat(newProduct.price), image: newProduct.image, description: newProduct.description });
    setNewProduct({ name: '', price: '', image: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3"><Package className="text-blue-500" /> Painel Administrativo</h1>
          <button onClick={() => { logoutAdmin(); navigate('/'); }} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors"><LogOut size={20} /> Sair</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold mb-6 text-blue-400 flex items-center gap-2"><MessageSquare size={20} /> Tickets ({tickets.filter(t => t.status === 'open').length})</h2>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {tickets.filter(t => t.status === 'open').map(ticket => (
                  <div key={ticket.id} className="p-4 rounded-xl border bg-slate-800/50 border-slate-700">
                    <h3 className="font-bold text-white mb-2">{ticket.customerName} ({ticket.robloxUsername})</h3>
                    <div className="bg-slate-950/50 rounded-lg p-3 mb-4 max-h-40 overflow-y-auto space-y-2">
                      {ticket.messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] p-2 rounded-lg text-sm ${msg.sender === 'admin' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}>{msg.text}</div>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); if (!adminReply.trim()) return; replyToTicket(ticket.id, adminReply, 'admin'); setAdminReply(''); }} className="flex gap-2">
                      <input type="text" value={activeTicketId === ticket.id ? adminReply : ''} onChange={(e) => { setActiveTicketId(ticket.id); setAdminReply(e.target.value); }} placeholder="Responder..." className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                      <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors"><Send size={16} /></button>
                    </form>
                    <button onClick={() => closeTicket(ticket.id)} className="w-full mt-3 bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg text-xs font-bold">Concluir Ticket</button>
                  </div>
                ))}
              </div>
            </div>
            {/* Add Product Form */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold mb-6 text-blue-400">Adicionar Brainrot</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white" placeholder="Nome do Item" />
                <input type="number" step="0.01" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white" placeholder="Preço (€)" />
                <input type="text" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white" placeholder="URL da Imagem" />
                <textarea value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white h-24 resize-none" placeholder="Descrição..." />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"><Plus size={20} /> Adicionar Produto</button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-800"><h2 className="text-xl font-bold text-white">Produtos Ativos ({products.length})</h2></div>
              <div className="divide-y divide-slate-800">
                {products.map(product => (
                  <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-slate-800/50 transition-colors">
                    <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover bg-slate-800" />
                    <div className="flex-1"><h3 className="font-bold text-white">{product.name}</h3><p className="text-slate-400 text-sm">€ {product.price.toFixed(2)}</p></div>
                    <button onClick={() => removeProduct(product.id)} className="p-2 text-slate-500 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
