import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Tables, Insertable, Updatable, EquipoEstado } from '@/integrations/supabase/client';

export type Equipo = Tables<'equipos'>;
export type EquipoInsert = Insertable<'equipos'>;
export type EquipoUpdate = Updatable<'equipos'>;
export type { EquipoEstado };

export const useEquipos = () => {
  return useQuery({
    queryKey: ['equipos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Equipo[];
    },
  });
};

export const useEquipo = (id: string | undefined) => {
  return useQuery({
    queryKey: ['equipos', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('equipos')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Equipo | null;
    },
    enabled: !!id,
  });
};

export const useEquiposByEstado = (estado: EquipoEstado) => {
  return useQuery({
    queryKey: ['equipos', 'estado', estado],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipos')
        .select('*')
        .eq('estado', estado)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Equipo[];
    },
  });
};

export const useCreateEquipo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (equipo: EquipoInsert) => {
      const { data, error } = await supabase
        .from('equipos')
        .insert(equipo)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipos'] });
    },
  });
};

export const useUpdateEquipo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: EquipoUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('equipos')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['equipos'] });
      queryClient.invalidateQueries({ queryKey: ['equipos', variables.id] });
    },
  });
};

export const useDeleteEquipo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('equipos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipos'] });
    },
  });
};
