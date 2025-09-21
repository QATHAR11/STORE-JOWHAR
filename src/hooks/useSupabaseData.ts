import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Tables = Database['public']['Tables'];

export function useSupabaseData<T extends keyof Tables>(
  table: T,
  options?: {
    filter?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    realtime?: boolean;
  }
) {
  const [data, setData] = useState<Tables[T]['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let subscription: any;

    const fetchData = async () => {
      try {
        setLoading(true);
        let query = supabase.from(table).select('*');

        // Apply filters
        if (options?.filter) {
          Object.entries(options.filter).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
        }

        // Apply ordering
        if (options?.orderBy) {
          query = query.order(options.orderBy.column, { 
            ascending: options.orderBy.ascending ?? true 
          });
        }

        const { data: fetchedData, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setData(fetchedData || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]);
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
    insert,
    update,
    remove,
    refetch: () => {
      setLoading(true);
      // Trigger re-fetch by updating the effect dependency
    }
  };
}