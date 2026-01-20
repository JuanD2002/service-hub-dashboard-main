export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type DocumentoTipo = 
  | 'ficha_tecnica'
  | 'manual'
  | 'factura'
  | 'certificado'
  | 'reporte_mantenimiento'
  | 'tecnovigilancia'
  | 'foto'
  | 'garantia'
  | 'calibracion'
  | 'protocolo'
  | 'otro';

export type EquipoEstado = 
  | 'operativo'
  | 'en_mantenimiento'
  | 'fuera_de_servicio'
  | 'dado_de_baja';

export type UserRole = 'admin' | 'prestador';

export type UserStatus = 'active' | 'inactive';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          auth_id: string | null
          role: UserRole
          name: string
          email: string
          organization: string | null
          position: string | null
          phone: string | null
          status: UserStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          auth_id?: string | null
          role: UserRole
          name: string
          email: string
          organization?: string | null
          position?: string | null
          phone?: string | null
          status?: UserStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          auth_id?: string | null
          role?: UserRole
          name?: string
          email?: string
          organization?: string | null
          position?: string | null
          phone?: string | null
          status?: UserStatus
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      equipos: {
        Row: {
          id: string
          nombre: string
          tipo: string
          modelo: string | null
          fabricante: string | null
          numero_serie: string | null
          ubicacion: string | null
          fecha_adquisicion: string | null
          estado: EquipoEstado
          proximo_mantenimiento: string | null
          ultimo_mantenimiento: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nombre: string
          tipo: string
          modelo?: string | null
          fabricante?: string | null
          numero_serie?: string | null
          ubicacion?: string | null
          fecha_adquisicion?: string | null
          estado?: EquipoEstado
          proximo_mantenimiento?: string | null
          ultimo_mantenimiento?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          tipo?: string
          modelo?: string | null
          fabricante?: string | null
          numero_serie?: string | null
          ubicacion?: string | null
          fecha_adquisicion?: string | null
          estado?: EquipoEstado
          proximo_mantenimiento?: string | null
          ultimo_mantenimiento?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      documentos: {
        Row: {
          id: string
          equipo_id: string
          nombre: string
          tipo: DocumentoTipo
          file_url: string
          file_name: string
          file_size: number | null
          mime_type: string | null
          descripcion: string | null
          fecha_documento: string | null
          fecha_vencimiento: string | null
          uploaded_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          equipo_id: string
          nombre: string
          tipo: DocumentoTipo
          file_url: string
          file_name: string
          file_size?: number | null
          mime_type?: string | null
          descripcion?: string | null
          fecha_documento?: string | null
          fecha_vencimiento?: string | null
          uploaded_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          equipo_id?: string
          nombre?: string
          tipo?: DocumentoTipo
          file_url?: string
          file_name?: string
          file_size?: number | null
          mime_type?: string | null
          descripcion?: string | null
          fecha_documento?: string | null
          fecha_vencimiento?: string | null
          uploaded_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "documentos_equipo_id_fkey"
            columns: ["equipo_id"]
            isOneToOne: false
            referencedRelation: "equipos"
            referencedColumns: ["id"]
          }
        ]
      }
      asignaciones: {
        Row: {
          id: string
          equipo_id: string
          prestador_id: string
          assigned_at: string
          assigned_by: string | null
          notas: string | null
        }
        Insert: {
          id?: string
          equipo_id: string
          prestador_id: string
          assigned_at?: string
          assigned_by?: string | null
          notas?: string | null
        }
        Update: {
          id?: string
          equipo_id?: string
          prestador_id?: string
          assigned_at?: string
          assigned_by?: string | null
          notas?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asignaciones_equipo_id_fkey"
            columns: ["equipo_id"]
            isOneToOne: false
            referencedRelation: "equipos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asignaciones_prestador_id_fkey"
            columns: ["prestador_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      documento_tipo: DocumentoTipo
      equipo_estado: EquipoEstado
      user_role: UserRole
      user_status: UserStatus
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Insertable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updatable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
