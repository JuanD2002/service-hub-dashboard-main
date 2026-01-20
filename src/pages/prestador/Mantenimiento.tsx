import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench } from 'lucide-react';

const MantenimientoPrestador: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Wrench className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mantenimiento</h1>
            <p className="text-muted-foreground">Historial de mantenimientos de mis equipos</p>
          </div>
        </div>
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Registro de Mantenimientos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Módulo en desarrollo...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MantenimientoPrestador;
