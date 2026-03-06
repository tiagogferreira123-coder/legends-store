import React from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { cart, removeFromCart, cartTotal } = useStore();

  const handleCheckout = () => {
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=tiagogferreira123@gmail.com&currency_code=EUR&amount=${cartTotal.toFixed(2)}&item_name=Legends%20Store%20Order`;
    window.open(paypalUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Teu Carrinho</h1>
        {cart.length === 0 ? (
          <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-slate-400 mb-6">Carrinho vazio!</p>
            <Link to="/" className="bg-blue-600 px-6 py-3 rounded-xl font-bold">Voltar à Loja</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
                  <img src={item.image} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-blue-400">€ {item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500"><Trash2 /></button>
                </div>
              ))}
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 h-fit">
              <h2 className="text-xl font-bold mb-4">Resumo</h2>
              <div className="flex justify-between text-xl font-bold border-t border-slate-800 pt-4 mb-6">
                <span>Total:</span>
                <span>€ {cartTotal.toFixed(2)}</span>
              </div>
              <button onClick={handleCheckout} className="w-full bg-[#0070BA] py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                <CreditCard /> Pagar com PayPal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};