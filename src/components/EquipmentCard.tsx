import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusIndicator } from './StatusIndicator';
import { Cpu, Calendar, MapPin } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  type: string;
  model: string;
  location: string;
  status: 'active' | 'pending' | 'inactive';
  lastMaintenance: string;
  nextMaintenance: string;
}

interface EquipmentCardProps {
  equipment: Equipment;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment }) => {
  return (
    <Card className="card-elevated hover:shadow-lg transition-shadow duration-200 animate-scale-in">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Cpu className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">{equipment.name}</h3>
              <p className="text-sm text-muted-foreground">{equipment.model}</p>
            </div>
          </div>
          <StatusIndicator status={equipment.status} />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{equipment.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Próximo mant:</span>
            <Badge variant="secondary" className="text-xs">
              {equipment.nextMaintenance}
            </Badge>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-border">
          <Badge variant="outline" className="text-xs">
            {equipment.type}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
