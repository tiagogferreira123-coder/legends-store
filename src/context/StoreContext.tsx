import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, INITIAL_PRODUCTS, Ticket } from '../types';
import { toast } from 'sonner';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  tickets: Ticket[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  addTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'status' | 'messages'>, initialMessage: string) => string;
  replyToTicket: (ticketId: string, message: string, sender: 'admin' | 'customer') => void;
  closeTicket: (id: string) => void;
  cartTotal: number;
  isAdminAuthenticated: boolean;
  loginAdmin: (key: string) => boolean;
  logoutAdmin: () => void;
  logoUrl: string;
  updateLogo: (url: string) => void;
  heroBackgroundUrl: string;
  updateHeroBackground: (url: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('legends-products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('legends-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem('legends-tickets');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('legends-admin-auth') === 'true';
  });
  const [logoUrl, setLogoUrl] = useState<string>(() => localStorage.getItem('legends-logo') || '');
  const [heroBackgroundUrl, setHeroBackgroundUrl] = useState<string>(() => localStorage.getItem('legends-hero-bg') || 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2070&auto=format&fit=crop');

  useEffect(() => { localStorage.setItem('legends-products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('legends-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('legends-tickets', JSON.stringify(tickets)); }, [tickets]);
  useEffect(() => { localStorage.setItem('legends-admin-auth', String(isAdminAuthenticated)); }, [isAdminAuthenticated]);
  useEffect(() => { localStorage.setItem('legends-logo', logoUrl); }, [logoUrl]);
  useEffect(() => { localStorage.setItem('legends-hero-bg', heroBackgroundUrl); }, [heroBackgroundUrl]);

  const addTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'status' | 'messages'>, initialMessage: string) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'open',
      createdAt: new Date().toISOString(),
      messages: [{ id: Date.now().toString(), sender: 'customer', text: initialMessage, timestamp: new Date().toISOString() }]
    };
    setTickets(prev => [newTicket, ...prev]);
    toast.success('Chat iniciado! Como podemos ajudar?');
    return newTicket.id;
  };

  const replyToTicket = (ticketId: string, message: string, sender: 'admin' | 'customer') => {
    setTickets(prev => prev.map(ticket => ticket.id === ticketId ? { ...ticket, messages: [...ticket.messages, { id: Date.now().toString(), sender, text: message, timestamp: new Date().toISOString() }] } : ticket));
  };

  const loginAdmin = (key: string) => {
    const normalizedKey = key.trim().toUpperCase();
    if (normalizedKey === "LEGEND'S GAME STORE123" || normalizedKey === 'ADMIN123') {
      setIsAdminAuthenticated(true);
      toast.success('Login de administrador realizado!');
      return true;
    }
    toast.error('Chave de acesso inválida');
    return false;
  };

  return (
    <StoreContext.Provider value={{
      products, cart, tickets, addProduct: (p) => setProducts(prev => [...prev, p]),
      removeProduct: (id) => setProducts(prev => prev.filter(p => p.id !== id)),
      addToCart: (p) => setCart(prev => {
        const ex = prev.find(i => i.id === p.id);
        return ex ? prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i) : [...prev, { ...p, quantity: 1 }];
      }),
      removeFromCart: (id) => setCart(prev => prev.filter(i => i.id !== id)),
      clearCart: () => setCart([]), addTicket, replyToTicket,
      closeTicket: (id) => setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'closed' } : t)),
      cartTotal: cart.reduce((t, i) => t + (i.price * i.quantity), 0),
      isAdminAuthenticated, loginAdmin, logoutAdmin: () => setIsAdminAuthenticated(false),
      logoUrl, updateLogo: (u) => setLogoUrl(u), heroBackgroundUrl, updateHeroBackground: (u) => setHeroBackgroundUrl(u)
    }}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
