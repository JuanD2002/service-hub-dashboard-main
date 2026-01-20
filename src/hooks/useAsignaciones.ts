import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Tables, Insertable } from '@/integrations/supabase/client';

export type Asignacion = Tables<'asignaciones'>;
export type AsignacionInsert = Insertable<'asignaciones'>;

export const useAsignaciones = () => {
  return useQuery({
    queryKey: ['asignaciones'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('asignaciones')
        .select('*, equipos(nombre, tipo, modelo), profiles!asignaciones_prestador_id_fkey(name, organization)')
        .order('assigned_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useAsignacionesByPrestador = (prestadorId: string | undefined) => {
  return useQuery({
    queryKey: ['asignaciones', 'prestador', prestadorId],
    queryFn: async () => {
      if (!prestadorId) return [];
      const { data, error } = await supabase
        .from('asignaciones')
        .select('*, equipos(*)')
        .eq('prestador_id', prestadorId)
        .order('assigned_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!prestadorId,
  });
};

export const useEquiposAsignadosPrestador = (prestadorId: string | undefined) => {
  return useQuery({
    queryKey: ['equipos', 'asignados', prestadorId],
    queryFn: async () => {
      if (!prestadorId) return [];
      const { data, error } = await supabase
        .from('asignaciones')
        .select('equipos(*)')
        .eq('prestador_id', prestadorId);
      
      if (error) throw error;
      return data.map(a => a.equipos).filter(Boolean);
    },
    enabled: !!prestadorId,
  });
};

export const useCreateAsignacion = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (asignacion: AsignacionInsert) => {
      const { data, error } = await supabase
        .from('asignaciones')
        .insert(asignacion)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asignaciones'] });
      queryClient.invalidateQueries({ queryKey: ['equipos'] });
    },
  });
};

export const useDeleteAsignacion = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('asignaciones')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asignaciones'] });
      queryClient.invalidateQueries({ queryKey: ['equipos'] });
    },
  });
};
