import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Tables, Insertable, Updatable, DocumentoTipo } from '@/integrations/supabase/client';

export type Documento = Tables<'documentos'>;
export type DocumentoInsert = Insertable<'documentos'>;
export type DocumentoUpdate = Updatable<'documentos'>;

export const useDocumentos = () => {
  return useQuery({
    queryKey: ['documentos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documentos')
        .select('*, equipos(nombre)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useDocumentosByEquipo = (equipoId: string | undefined) => {
  return useQuery({
    queryKey: ['documentos', 'equipo', equipoId],
    queryFn: async () => {
      if (!equipoId) return [];
      const { data, error } = await supabase
        .from('documentos')
        .select('*')
        .eq('equipo_id', equipoId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Documento[];
    },
    enabled: !!equipoId,
  });
};

export const useDocumentosByTipo = (tipo: DocumentoTipo) => {
  return useQuery({
    queryKey: ['documentos', 'tipo', tipo],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documentos')
        .select('*, equipos(nombre)')
        .eq('tipo', tipo)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateDocumento = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (documento: DocumentoInsert) => {
      const { data, error } = await supabase
        .from('documentos')
        .insert(documento)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['documentos'] });
      queryClient.invalidateQueries({ queryKey: ['documentos', 'equipo', variables.equipo_id] });
    },
  });
};

export const useDeleteDocumento = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('documentos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentos'] });
    },
  });
};
