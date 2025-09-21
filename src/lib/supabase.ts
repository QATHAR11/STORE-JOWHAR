import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      brands: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          image: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          image?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          image?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          category: string;
          price: number;
          description: string | null;
          ingredients: string | null;
          usage: string | null;
          images: string[];
          stock: number;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          price: number;
          description?: string | null;
          ingredients?: string | null;
          usage?: string | null;
          images?: string[];
          stock?: number;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          price?: number;
          description?: string | null;
          ingredients?: string | null;
          usage?: string | null;
          images?: string[];
          stock?: number;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      banners: {
        Row: {
          id: string;
          title: string;
          subtitle: string | null;
          image: string;
          category: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          subtitle?: string | null;
          image: string;
          category?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          subtitle?: string | null;
          image?: string;
          category?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      navigation_items: {
        Row: {
          id: string;
          name: string;
          type: string;
          items: any[];
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: string;
          items?: any[];
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          items?: any[];
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          customer_name: string;
          customer_phone: string;
          customer_email: string | null;
          items: any[];
          total: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_name: string;
          customer_phone: string;
          customer_email?: string | null;
          items: any[];
          total: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_name?: string;
          customer_phone?: string;
          customer_email?: string | null;
          items?: any[];
          total?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}