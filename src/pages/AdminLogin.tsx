import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export const AdminLogin = () => {
  const [key, setKey] = useState('');
  const { loginAdmin } = useStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (loginAdmin(key)) { navigate('/admin/dashboard'); } 
      else { setIsLoading(false); }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">
        <div className="flex justify-center mb-6"><div className="p-4 bg-slate-800 rounded-full text-blue-500"><Lock size={32} /></div></div>
        <h2 className="text-2xl font-bold text-center text-white mb-2">Acesso Restrito</h2>
        <p className="text-slate-400 text-center mb-8">Digite a chave de acesso para continuar</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="password" value={key} onChange={(e) => setKey(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-center tracking-widest" placeholder="CHAVE DE ACESSO" />
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
            {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Entrar no Painel'}
          </button>
        </form>
      </div>
    </div>
  );
};
