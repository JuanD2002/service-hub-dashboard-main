import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatsCard } from '@/components/StatsCard';
import { ActivityCalendar } from '@/components/ActivityCalendar';
import { EquipmentChart } from '@/components/EquipmentChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusIndicator } from '@/components/StatusIndicator';
import { 
  Cpu, 
  FileText, 
  AlertTriangle, 
  Wrench, 
  TrendingUp,
  Clock,
} from 'lucide-react';

const recentActivities = [
  { id: 1, action: 'Mantenimiento completado', item: 'Equipo Monitor Cardíaco XR-500', time: 'Hace 2 horas', status: 'active' as const },
  { id: 2, action: 'Calibración programada', item: 'Balanza de precisión BP-200', time: 'Hace 4 horas', status: 'pending' as const },
  { id: 3, action: 'Incidente reportado', item: 'Desfibrilador DF-1000', time: 'Hace 6 horas', status: 'inactive' as const },
  { id: 4, action: 'Capacitación completada', item: 'Tecnovigilancia Q4 2024', time: 'Ayer', status: 'active' as const },
];

const AdminDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Panel de Administración</h1>
            <p className="text-muted-foreground">Resumen general del sistema de tecnovigilancia</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Última actualización: {new Date().toLocaleString('es-ES')}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Equipos"
            value={65}
            description="Equipos registrados"
            icon={Cpu}
            trend={{ value: 8, positive: true }}
          />
          <StatsCard
            title="Mantenimientos"
            value={12}
            description="Pendientes este mes"
            icon={Wrench}
          />
          <StatsCard
            title="Incidentes"
            value={3}
            description="Abiertos actualmente"
            icon={AlertTriangle}
            trend={{ value: 2, positive: false }}
          />
          <StatsCard
            title="Reportes"
            value={8}
            description="Generados este mes"
            icon={FileText}
            trend={{ value: 15, positive: true }}
          />
        </div>

        {/* Charts Section */}
        <EquipmentChart />

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="card-elevated lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors animate-slide-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <StatusIndicator status={activity.status} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.item}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {activity.time}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calendar */}
          <ActivityCalendar />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
