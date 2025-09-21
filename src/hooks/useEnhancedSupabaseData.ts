import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Tables = Database['public']['Tables'];

export interface FilterOptions {
  category?: string;
  brand?: string;
  gender?: string;
  priceRange?: [number, number];
  featured?: boolean;
  status?: string;
  search?: string;
}

export interface SortOptions {
  column: string;
  ascending?: boolean;
}

export function useEnhancedSupabaseData<T extends keyof Tables>(
  table: T,
  options?: {
    filter?: FilterOptions;
    sort?: SortOptions;
    limit?: number;
    realtime?: boolean;
  }
) {
  const [data, setData] = useState<Tables[T]['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let subscription: any;

    const fetchData = async () => {
      try {
        setLoading(true);
        let query = supabase.from(table).select('*', { count: 'exact' });

        // Apply filters based on table type
        if (options?.filter) {
          const { category, brand, gender, priceRange, featured, status, search } = options.filter;

          if (table === 'enhanced_products') {
            if (category) {
              // Join with categories to filter by category name
              query = query.eq('category_id', category);
            }
            if (brand) {
              query = query.eq('brand_id', brand);
            }
            if (gender) {
              query = query.eq('gender_category', gender);
            }
            if (priceRange) {
              query = query.gte('price', priceRange[0]).lte('price', priceRange[1]);
            }
            if (featured !== undefined) {
              query = query.eq('featured', featured);
            }
            if (status) {
              query = query.eq('status', status);
            }
            if (search) {
              query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
            }
          }

          if (table === 'enhanced_categories' || table === 'enhanced_brands' || table === 'gender_categories') {
            if (status !== undefined) {
              query = query.eq('active', status === 'active');
            }
            if (search) {
              query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
            }
          }
        }

        // Apply sorting
        if (options?.sort) {
          query = query.order(options.sort.column, { 
            ascending: options.sort.ascending ?? true 
          });
        } else {
          // Default sorting
          if (table === 'enhanced_products') {
            query = query.order('featured', { ascending: false }).order('created_at', { ascending: false });
          } else {
            query = query.order('sort_order', { ascending: true }).order('name', { ascending: true });
          }
        }

        // Apply limit
        if (options?.limit) {
          query = query.limit(options.limit);
        }

        const { data: fetchedData, error: fetchError, count } = await query;

        if (fetchError) throw fetchError;
        setData(fetchedData || []);
        setTotal(count || 0);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up real-time subscription if enabled
    if (options?.realtime) {
      subscription = supabase
        .channel(`${table}_changes`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: table,
          },
          () => {
            fetchData();
          }
        )
        .subscribe();
    }

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [table, JSON.stringify(options)]);

  const insert = async (data: Tables[T]['Insert']) => {
    const { data: insertedData, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return insertedData;
  };

  const update = async (id: string, data: Tables[T]['Update']) => {
    const { data: updatedData, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return updatedData;
  };

  const remove = async (id: string) => {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) throw error;
  };

  return {
    data,
    loading,
    error,
    total,
    insert,
    update,
    remove,
    refetch: fetchData
  };
}

// Specialized hooks for common use cases
export function useProducts(filters?: FilterOptions, sort?: SortOptions, limit?: number) {
  return useEnhancedSupabaseData('enhanced_products', {
    filter: filters,
    sort: sort,
    limit: limit,
    realtime: true
  });
}

export function useCategories(activeOnly = true) {
  return useEnhancedSupabaseData('enhanced_categories', {
    filter: { status: activeOnly ? 'active' : undefined },
    realtime: true
  });
}

export function useBrands(activeOnly = true) {
  return useEnhancedSupabaseData('enhanced_brands', {
    filter: { status: activeOnly ? 'active' : undefined },
    realtime: true
  });
}

export function useGenderCategories(activeOnly = true) {
  return useEnhancedSupabaseData('gender_categories', {
    filter: { status: activeOnly ? 'active' : undefined },
    realtime: true
  });
}

export function useOrders(customerId?: string) {
  return useEnhancedSupabaseData('enhanced_orders', {
    filter: customerId ? { customer: customerId } : undefined,
    sort: { column: 'created_at', ascending: false },
    realtime: true
  });
}

// Product search with full-text search
export async function searchProducts(query: string, filters?: FilterOptions) {
  let supabaseQuery = supabase
    .from('enhanced_products')
    .select(`
      *,
      enhanced_categories!inner(name, slug),
      enhanced_brands(name, slug)
    `)
    .eq('status', 'active');

  if (query) {
    supabaseQuery = supabaseQuery.or(
      `name.ilike.%${query}%,description.ilike.%${query}%,ingredients.ilike.%${query}%`
    );
  }

  if (filters?.category) {
    supabaseQuery = supabaseQuery.eq('category_id', filters.category);
  }

  if (filters?.brand) {
    supabaseQuery = supabaseQuery.eq('brand_id', filters.brand);
  }

  if (filters?.gender) {
    supabaseQuery = supabaseQuery.eq('gender_category', filters.gender);
  }

  if (filters?.priceRange) {
    supabaseQuery = supabaseQuery
      .gte('price', filters.priceRange[0])
      .lte('price', filters.priceRange[1]);
  }

  if (filters?.featured !== undefined) {
    supabaseQuery = supabaseQuery.eq('featured', filters.featured);
  }

  const { data, error } = await supabaseQuery
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Get product with full details including brand and category
export async function getProductDetails(productId: string) {
  const { data, error } = await supabase
    .from('enhanced_products')
    .select(`
      *,
      enhanced_categories(name, slug, description),
      enhanced_brands(name, slug, description),
      product_variants(*),
      product_reviews(
        id, rating, title, review_text, customer_name, 
        verified_purchase, created_at
      )
    `)
    .eq('id', productId)
    .eq('product_reviews.status', 'approved')
    .single();

  if (error) throw error;
  return data;
}

// Create order with items
export async function createOrder(orderData: any, items: any[]) {
  const { data, error } = await supabase.rpc('create_order_with_items', {
    order_data: orderData,
    items_data: items
  });

  if (error) throw error;
  return data;
}

// Update inventory
export async function updateInventory(
  productId: string,
  quantityChange: number,
  changeType: string,
  variantId?: string,
  referenceId?: string,
  referenceType?: string,
  notes?: string
) {
  const { data, error } = await supabase.rpc('update_product_inventory', {
    p_product_id: productId,
    p_variant_id: variantId,
    p_quantity_change: quantityChange,
    p_change_type: changeType,
    p_reference_id: referenceId,
    p_reference_type: referenceType,
    p_notes: notes
  });

  if (error) throw error;
  return data;
}