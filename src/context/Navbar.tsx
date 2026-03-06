import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Gamepad2, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar = () => {
  const { cart } = useStore();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Gamepad2 className="text-blue-500" size={32} />
            <span className="text-xl font-black text-white tracking-tighter italic">LEGEND'S</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/support" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Suporte</Link>
            <Link to="/cart" className="relative p-2 text-slate-400 hover:text-blue-400 transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/admin" className="p-2 text-slate-400 hover:text-white transition-colors">
              <User size={24} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};