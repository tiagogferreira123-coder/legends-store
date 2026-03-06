export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export interface Ticket {
  id: string;
  customerName: string;
  email: string;
  robloxUsername: string;
  subject: string;
  status: 'open' | 'closed';
  createdAt: string;
  messages: {
    id: string;
    text: string;
    sender: 'customer' | 'admin';
    timestamp: string;
  }[];
}