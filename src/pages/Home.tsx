import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';

export const Home = () => {
  const { addToCart } = useStore();

  // Lista de produtos (podes mudar os preços e nomes aqui)
  const products = [
    { id: '1', name: 'Skibidi Gold', price: 15.99, image: 'https://picsum.photos/seed/skibidi/400/400', description: 'O brainrot mais lendário.' },
    { id: '2', name: 'Sigma Face', price: 9.99, image: 'https://picsum.photos/seed/sigma/400/400', description: 'Torna-te um verdadeiro Sigma.' },
    { id: '3', name: 'Grimace Shake', price: 12.50, image: 'https://picsum.photos/seed/grimace/400/400', description: 'Cuidado com o sabor.' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black text-center text-white mb-12 tracking-tighter"
        >
          LEGEND'S STORE
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 p-6">
              <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-xl mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
              <p className="text-slate-400 text-sm mb-6">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-400">€ {product.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                >
                  <ShoppingCart size={18} /> Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};