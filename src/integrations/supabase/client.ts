import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials not found. Please connect to Lovable Cloud.');
}

export const supabase = createClient<Database>(
  SUPABASE_URL || 'https://kxcflajcreypypwsyupk.supabase.co',
  SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4Y2ZsYWpjcmV5cHlwd3N5dXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3ODA0NzksImV4cCI6MjA4NDM1NjQ3OX0.9wksKsWO4r_ux_elA2J48Y1Jv7HwaAsZp3KcNeeMgfg'
);

export type { Database, Tables, Insertable, Updatable, DocumentoTipo, EquipoEstado } from './database.types';
