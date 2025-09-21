export interface Product {
  id: string;
  name: string;
  category: 'Hair' | 'Beard' | 'Skincare' | 'Perfume' | 'Body Spray' | 'Air Freshener';
  price: number;
  description: string;
  ingredients?: string;
  usage?: string;
  images: string[];
  stock: number;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category?: string;
  active: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'delivered';
  createdAt: Date;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  image: string;
  active: boolean;
}

export interface NavigationItem {
  id: string;
  name: string;
  type: 'category' | 'brand' | 'gender';
  items: Array<{
    id: string;
    name: string;
    description?: string;
    image?: string;
  }>;
  active: boolean;
}