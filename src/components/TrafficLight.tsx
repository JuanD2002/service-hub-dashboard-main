import React from 'react';
import { cn } from '@/lib/utils';

interface TrafficLightProps {
  status: 'active' | 'pending' | 'inactive';
  className?: string;
}

export const TrafficLight: React.FC<TrafficLightProps> = ({ status, className }) => {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span
        className={cn(
          'w-3 h-3 rounded-full transition-all duration-300',
          status === 'inactive' ? 'status-inactive' : 'bg-muted-foreground/20'
        )}
      />
      <span
        className={cn(
          'w-3 h-3 rounded-full transition-all duration-300',
          status === 'pending' ? 'status-pending' : 'bg-muted-foreground/20'
        )}
      />
      <span
        className={cn(
          'w-3 h-3 rounded-full transition-all duration-300',
          status === 'active' ? 'status-active' : 'bg-muted-foreground/20'
        )}
      />
    </div>
  );
};
