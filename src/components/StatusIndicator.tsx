import React from 'react';
import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  status: 'active' | 'pending' | 'inactive';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const statusLabels = {
  active: 'Activo',
  pending: 'Pendiente',
  inactive: 'Inactivo',
};

const sizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  showLabel = false,
  size = 'md',
}) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          'rounded-full animate-pulse-glow',
          sizeClasses[size],
          status === 'active' && 'status-active',
          status === 'pending' && 'status-pending',
          status === 'inactive' && 'status-inactive'
        )}
      />
      {showLabel && (
        <span className="text-sm text-muted-foreground">{statusLabels[status]}</span>
      )}
    </div>
  );
};
