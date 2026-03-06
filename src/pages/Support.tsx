import React from 'react';

export const Support = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center">
        <h1 className="text-3xl font-bold mb-4">Suporte</h1>
        <p className="text-slate-400 mb-8">Precisas de ajuda com a tua encomenda?</p>
        <div className="space-y-4 text-left">
          <div className="bg-slate-800 p-4 rounded-xl">
            <p className="text-sm text-slate-500">Email de contacto:</p>
            <p className="font-bold">tiagogferreira123@gmail.com</p>
          </div>
          <p className="text-xs text-slate-500 text-center italic">Respondemos em até 24 horas.</p>
        </div>
      </div>
    </div>
  );
};