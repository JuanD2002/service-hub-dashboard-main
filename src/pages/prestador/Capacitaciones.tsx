import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

const CapacitacionesPrestador: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Capacitaciones</h1>
            <p className="text-muted-foreground">Mis capacitaciones y entrenamientos</p>
          </div>
        </div>
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Historial de Capacitaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Módulo en desarrollo...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CapacitacionesPrestador;
