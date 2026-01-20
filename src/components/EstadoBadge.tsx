import React from 'react';
import { Badge } from '@/components/ui/badge';
import { EquipoEstado } from '@/integrations/supabase/client';

interface EstadoBadgeProps {
  estado: EquipoEstado;
}

const estadoConfig: Record<EquipoEstado, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  operativo: { label: 'Operativo', variant: 'default' },
  en_mantenimiento: { label: 'En Mantenimiento', variant: 'secondary' },
  fuera_de_servicio: { label: 'Fuera de Servicio', variant: 'destructive' },
  dado_de_baja: { label: 'Dado de Baja', variant: 'outline' },
};

export const EstadoBadge: React.FC<EstadoBadgeProps> = ({ estado }) => {
  const config = estadoConfig[estado] || { label: estado, variant: 'outline' as const };
  
  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
};
