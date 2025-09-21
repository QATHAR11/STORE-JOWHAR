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
      gender_categories: {
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
      enhanced_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image: string | null;
          parent_id: string | null;
          sort_order: number;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image?: string | null;
          parent_id?: string | null;
          sort_order?: number;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image?: string | null;
          parent_id?: string | null;
          sort_order?: number;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      enhanced_brands: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          logo: string | null;
          website: string | null;
          country: string | null;
          active: boolean;
          featured: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          logo?: string | null;
          website?: string | null;
          country?: string | null;
          active?: boolean;
          featured?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          logo?: string | null;
          website?: string | null;
          country?: string | null;
          active?: boolean;
          featured?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      customers: {
        Row: {
          id: string;
          email: string | null;
          phone: string | null;
          first_name: string | null;
          last_name: string | null;
          date_of_birth: string | null;
          gender: string | null;
          address: any;
          preferences: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email?: string | null;
          phone?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          date_of_birth?: string | null;
          gender?: string | null;
          address?: any;
          preferences?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          phone?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          date_of_birth?: string | null;
          gender?: string | null;
          address?: any;
          preferences?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      enhanced_products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          sku: string | null;
          brand_id: string | null;
          category_id: string | null;
          gender_category: string | null;
          price: number;
          compare_price: number | null;
          cost_price: number | null;
          description: string | null;
          short_description: string | null;
          ingredients: string | null;
          usage_instructions: string | null;
          benefits: string | null;
          images: any;
          video_url: string | null;
          weight: number | null;
          dimensions: any;
          stock_quantity: number;
          low_stock_threshold: number;
          track_inventory: boolean;
          allow_backorder: boolean;
          featured: boolean;
          status: string;
          seo_title: string | null;
          seo_description: string | null;
          tags: string[] | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          sku?: string | null;
          brand_id?: string | null;
          category_id?: string | null;
          gender_category?: string | null;
          price: number;
          compare_price?: number | null;
          cost_price?: number | null;
          description?: string | null;
          short_description?: string | null;
          ingredients?: string | null;
          usage_instructions?: string | null;
          benefits?: string | null;
          images?: any;
          video_url?: string | null;
          weight?: number | null;
          dimensions?: any;
          stock_quantity?: number;
          low_stock_threshold?: number;
          track_inventory?: boolean;
          allow_backorder?: boolean;
          featured?: boolean;
          status?: string;
          seo_title?: string | null;
          seo_description?: string | null;
          tags?: string[] | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          sku?: string | null;
          brand_id?: string | null;
          category_id?: string | null;
          gender_category?: string | null;
          price?: number;
          compare_price?: number | null;
          cost_price?: number | null;
          description?: string | null;
          short_description?: string | null;
          ingredients?: string | null;
          usage_instructions?: string | null;
          benefits?: string | null;
          images?: any;
          video_url?: string | null;
          weight?: number | null;
          dimensions?: any;
          stock_quantity?: number;
          low_stock_threshold?: number;
          track_inventory?: boolean;
          allow_backorder?: boolean;
          featured?: boolean;
          status?: string;
          seo_title?: string | null;
          seo_description?: string | null;
          tags?: string[] | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          name: string;
          sku: string | null;
          price: number | null;
          compare_price: number | null;
          stock_quantity: number;
          weight: number | null;
          image: string | null;
          attributes: any;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          name: string;
          sku?: string | null;
          price?: number | null;
          compare_price?: number | null;
          stock_quantity?: number;
          weight?: number | null;
          image?: string | null;
          attributes?: any;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          name?: string;
          sku?: string | null;
          price?: number | null;
          compare_price?: number | null;
          stock_quantity?: number;
          weight?: number | null;
          image?: string | null;
          attributes?: any;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_reviews: {
        Row: {
          id: string;
          product_id: string;
          customer_id: string | null;
          customer_name: string | null;
          customer_email: string | null;
          rating: number;
          title: string | null;
          review_text: string | null;
          verified_purchase: boolean;
          helpful_count: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          customer_id?: string | null;
          customer_name?: string | null;
          customer_email?: string | null;
          rating: number;
          title?: string | null;
          review_text?: string | null;
          verified_purchase?: boolean;
          helpful_count?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          customer_id?: string | null;
          customer_name?: string | null;
          customer_email?: string | null;
          rating?: number;
          title?: string | null;
          review_text?: string | null;
          verified_purchase?: boolean;
          helpful_count?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          customer_id: string | null;
          session_id: string | null;
          product_id: string;
          variant_id: string | null;
          quantity: number;
          price: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id?: string | null;
          session_id?: string | null;
          product_id: string;
          variant_id?: string | null;
          quantity: number;
          price: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string | null;
          session_id?: string | null;
          product_id?: string;
          variant_id?: string | null;
          quantity?: number;
          price?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      enhanced_orders: {
        Row: {
          id: string;
          order_number: string;
          customer_id: string | null;
          customer_name: string;
          customer_email: string | null;
          customer_phone: string;
          billing_address: any;
          shipping_address: any;
          subtotal: number;
          tax_amount: number;
          shipping_amount: number;
          discount_amount: number;
          total_amount: number;
          currency: string;
          payment_status: string;
          payment_method: string | null;
          payment_reference: string | null;
          fulfillment_status: string;
          order_status: string;
          notes: string | null;
          tags: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          customer_id?: string | null;
          customer_name: string;
          customer_email?: string | null;
          customer_phone: string;
          billing_address?: any;
          shipping_address?: any;
          subtotal: number;
          tax_amount?: number;
          shipping_amount?: number;
          discount_amount?: number;
          total_amount: number;
          currency?: string;
          payment_status?: string;
          payment_method?: string | null;
          payment_reference?: string | null;
          fulfillment_status?: string;
          order_status?: string;
          notes?: string | null;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          customer_id?: string | null;
          customer_name?: string;
          customer_email?: string | null;
          customer_phone?: string;
          billing_address?: any;
          shipping_address?: any;
          subtotal?: number;
          tax_amount?: number;
          shipping_amount?: number;
          discount_amount?: number;
          total_amount?: number;
          currency?: string;
          payment_status?: string;
          payment_method?: string | null;
          payment_reference?: string | null;
          fulfillment_status?: string;
          order_status?: string;
          notes?: string | null;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          variant_id: string | null;
          product_name: string;
          variant_name: string | null;
          sku: string | null;
          quantity: number;
          unit_price: number;
          total_price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          variant_id?: string | null;
          product_name: string;
          variant_name?: string | null;
          sku?: string | null;
          quantity: number;
          unit_price: number;
          total_price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          variant_id?: string | null;
          product_name?: string;
          variant_name?: string | null;
          sku?: string | null;
          quantity?: number;
          unit_price?: number;
          total_price?: number;
          created_at?: string;
        };
      };
      inventory_logs: {
        Row: {
          id: string;
          product_id: string;
          variant_id: string | null;
          change_type: string;
          quantity_change: number;
          previous_quantity: number;
          new_quantity: number;
          reference_id: string | null;
          reference_type: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          variant_id?: string | null;
          change_type: string;
          quantity_change: number;
          previous_quantity: number;
          new_quantity: number;
          reference_id?: string | null;
          reference_type?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          variant_id?: string | null;
          change_type?: string;
          quantity_change?: number;
          previous_quantity?: number;
          new_quantity?: number;
          reference_id?: string | null;
          reference_type?: string | null;
          notes?: string | null;
          created_at?: string;
        };
      };
      enhanced_banners: {
        Row: {
          id: string;
          title: string;
          subtitle: string | null;
          description: string | null;
          image: string;
          mobile_image: string | null;
          link_url: string | null;
          link_text: string | null;
          category_id: string | null;
          brand_id: string | null;
          gender_category: string | null;
          position: string;
          active: boolean;
          start_date: string | null;
          end_date: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          subtitle?: string | null;
          description?: string | null;
          image: string;
          mobile_image?: string | null;
          link_url?: string | null;
          link_text?: string | null;
          category_id?: string | null;
          brand_id?: string | null;
          gender_category?: string | null;
          position?: string;
          active?: boolean;
          start_date?: string | null;
          end_date?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          subtitle?: string | null;
          description?: string | null;
          image?: string;
          mobile_image?: string | null;
          link_url?: string | null;
          link_text?: string | null;
          category_id?: string | null;
          brand_id?: string | null;
          gender_category?: string | null;
          position?: string;
          active?: boolean;
          start_date?: string | null;
          end_date?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      enhanced_navigation: {
        Row: {
          id: string;
          name: string;
          type: string;
          parent_id: string | null;
          url: string | null;
          target_type: string | null;
          target_id: string | null;
          icon: string | null;
          image: string | null;
          description: string | null;
          active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: string;
          parent_id?: string | null;
          url?: string | null;
          target_type?: string | null;
          target_id?: string | null;
          icon?: string | null;
          image?: string | null;
          description?: string | null;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          parent_id?: string | null;
          url?: string | null;
          target_type?: string | null;
          target_id?: string | null;
          icon?: string | null;
          image?: string | null;
          description?: string | null;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
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