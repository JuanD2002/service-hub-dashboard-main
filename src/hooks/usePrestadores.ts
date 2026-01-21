import { supabase } from "@/integrations/supabase/client";
import { useCallback, useEffect, useState } from "react";

export interface Prestador {
  id: string;
  name: string;
  position: string;
  organization: string;
  email: string;
  phone?: string;
  status: "active" | "inactive";
  created_at: string;
}

export const usePrestadores = () => {
  const [prestadores, setPrestadores] = useState<Prestador[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // FETCH - Obtener todos los prestadores
  const fetchPrestadores = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("prestadores")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching prestadores:", error);
        throw error;
      }

      setPrestadores(data || []);
    } catch (error) {
      console.error("Error fetching prestadores:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // CREATE - Crear prestador SIN usuario
  const createPrestador = async (prestador: Omit<Prestador, "id" | "created_at">) => {
    setCreating(true);
    try {
      const { data, error } = await supabase
        .from("prestadores")
        .insert([prestador])
        .select()
        .single();

      if (error) {
        console.error("Error creating prestador:", error);
        throw error;
      }

      await fetchPrestadores();
      return data;
    } catch (error) {
      console.error("Error creating prestador:", error);
      throw error;
    } finally {
      setCreating(false);
    }
  };

  // CREATE - Crear prestador CON usuario en auth.users
  const createPrestadorConUsuario = async (
    prestador: Omit<Prestador, "id" | "created_at"> & { password: string }
  ) => {
    setCreating(true);
    try {
      const { data, error } = await supabase.rpc("create_prestador_con_usuario", {
        p_email: prestador.email,
        p_password: prestador.password,
        p_name: prestador.name,
        p_position: prestador.position,
        p_organization: prestador.organization,
        p_phone: prestador.phone || null,
      });

      if (error) {
        console.error("Error creating prestador con usuario:", error);
        throw error;
      }

      if (!data?.success) {
        throw new Error(data?.error || "Error desconocido al crear usuario");
      }

      await fetchPrestadores();
      return data;
    } catch (error: any) {
      console.error("Error creating prestador con usuario:", error);
      throw new Error(error.message || "Error al crear usuario y prestador");
    } finally {
      setCreating(false);
    }
  };

  // UPDATE - Actualizar prestador
  const updatePrestador = async (id: string, prestador: Partial<Prestador>) => {
    setUpdating(true);
    try {
      const { data, error } = await supabase
        .from("prestadores")
        .update({ 
          ...prestador, 
          updated_at: new Date().toISOString() 
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating prestador:", error);
        throw error;
      }

      await fetchPrestadores();
      return data;
    } catch (error) {
      console.error("Error updating prestador:", error);
      throw error;
    } finally {
      setUpdating(false);
    }
  };

  // DELETE - Eliminar prestador
  const deletePrestador = async (id: string) => {
    setDeleting(true);
    try {
      const { error } = await supabase
        .from("prestadores")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting prestador:", error);
        throw error;
      }

      await fetchPrestadores();
    } catch (error) {
      console.error("Error deleting prestador:", error);
      throw error;
    } finally {
      setDeleting(false);
    }
  };

  // Effect para cargar datos iniciales
  useEffect(() => {
    fetchPrestadores();
  }, [fetchPrestadores]);

  return {
    prestadores,
    loading,
    creating,
    updating,
    deleting,
    
    // Actions
    createPrestador,
    createPrestadorConUsuario,
    updatePrestador,
    deletePrestador,
    
    // Refresh
    refresh: fetchPrestadores,
  };
};
