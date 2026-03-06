import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageSquare, Send, User, Gamepad2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Support = () => {
  const { addTicket, tickets, replyToTicket } = useStore();
  const [activeTicketId, setActiveTicketId] = useState<string | null>(() => {
    const openTicket = tickets.find(t => t.status === 'open');
    return openTicket ? openTicket.id : null;
  });
  const [newMessage, setNewMessage] = useState('');
  const [isStarting, setIsStarting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    robloxUsername: '',
    subject: 'Suporte Geral',
    message: ''
  });

  const activeTicket = tickets.find(t => t.id === activeTicketId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeTicket?.messages]);

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.robloxUsername) return;
    const newId = addTicket({
      customerName: formData.customerName,
      email: formData.email || 'guest@legends.com',
      robloxUsername: formData.robloxUsername,
      subject: formData.subject
    }, "Olá! Gostaria de suporte.");
    setActiveTicketId(newId);
    setIsStarting(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeTicketId) return;
    replyToTicket(activeTicketId, newMessage, 'customer');
    setNewMessage('');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl h-[80vh] bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 md:p-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white"><Gamepad2 size={24} /></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">Suporte Legend's</h2>
              <p className="text-xs text-emerald-400 font-medium">Online agora</p>
            </div>
          </div>
          {activeTicketId && (
            <button onClick={() => setActiveTicketId(null)} className="p-2 text-slate-400 hover:text-white transition-colors"><ArrowLeft size={20} /></button>
          )}
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
          <div className="flex justify-start">
            <div className="max-w-[85%] bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 shadow-lg">
              <p className="text-sm text-slate-200 leading-relaxed">Bem-vindo ao suporte oficial da **Legend's Store**! 🎮<br /><br />Como podemos ajudar você hoje?</p>
            </div>
          </div>
          {activeTicket?.messages.map((msg) => (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key={msg.id} className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl shadow-lg ${msg.sender === 'customer' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'}`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-2 opacity-50 ${msg.sender === 'customer' ? 'text-right' : 'text-left'}`}>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </motion.div>
          ))}
          {!activeTicketId && !isStarting && (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              <button onClick={() => setIsStarting(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"><MessageSquare size={20} /> Iniciar Bate-Papo</button>
            </div>
          )}
          <AnimatePresence>{isStarting && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-slate-800 p-6 rounded-2xl border border-blue-500/30 shadow-2xl max-w-md mx-auto">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><User size={18} className="text-blue-400" /> Identifique-se</h3>
              <form onSubmit={handleStartChat} className="space-y-4">
                <input type="text" placeholder="Seu Nome" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" required />
                <input type="text" placeholder="Usuário no Roblox" value={formData.robloxUsername} onChange={e => setFormData({...formData, robloxUsername: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" required />
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setIsStarting(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-bold transition-colors">Cancelar</button>
                  <button type="submit" className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-blue-500/20">Começar Chat</button>
                </div>
              </form>
            </motion.div>
          )}</AnimatePresence>
        </div>
        <div className="p-4 md:p-6 bg-slate-900 border-t border-slate-800">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder={activeTicketId ? "Digite sua mensagem..." : "Inicie o chat para digitar..."} disabled={!activeTicketId || activeTicket?.status === 'closed'} className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed" />
            <button type="submit" disabled={!activeTicketId || !newMessage.trim() || activeTicket?.status === 'closed'} className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white p-4 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20 disabled:shadow-none"><Send size={24} /></button>
          </form>
        </div>
      </div>
    </div>
  );
};
