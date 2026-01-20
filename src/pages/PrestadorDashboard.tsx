import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatsCard } from '@/components/StatsCard';
import { ActivityCalendar } from '@/components/ActivityCalendar';
import { EquipmentCard } from '@/components/EquipmentCard';
import { EquipmentChart } from '@/components/EquipmentChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import {
  Cpu,
  FileText,
  AlertTriangle,
  Wrench,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

const sampleEquipments = [
  {
    id: '1',
    name: 'Monitor Cardíaco',
    type: 'Monitoreo',
    model: 'XR-500',
    location: 'Sala 101',
    status: 'active' as const,
    lastMaintenance: '2024-10-15',
    nextMaintenance: '2025-01-15',
  },
  {
    id: '2',
    name: 'Desfibrilador',
    type: 'Emergencia',
    model: 'DF-1000',
    location: 'Urgencias',
    status: 'pending' as const,
    lastMaintenance: '2024-08-20',
    nextMaintenance: '2024-12-28',
  },
  {
    id: '3',
    name: 'Balanza de Precisión',
    type: 'Diagnóstico',
    model: 'BP-200',
    location: 'Laboratorio',
    status: 'active' as const,
    lastMaintenance: '2024-11-01',
    nextMaintenance: '2025-02-01',
  },
  {
    id: '4',
    name: 'Electrocardiógrafo',
    type: 'Diagnóstico',
    model: 'ECG-300',
    location: 'Consultorio 3',
    status: 'inactive' as const,
    lastMaintenance: '2024-06-10',
    nextMaintenance: '2024-12-10',
  },
  {
    id: '5',
    name: 'Nebulizador',
    type: 'Terapia',
    model: 'NB-150',
    location: 'Pediatría',
    status: 'active' as const,
    lastMaintenance: '2024-09-25',
    nextMaintenance: '2025-03-25',
  },
  {
    id: '6',
    name: 'Autoclave',
    type: 'Esterilización',
    model: 'AC-500',
    location: 'Central de Esterilización',
    status: 'active' as const,
    lastMaintenance: '2024-10-30',
    nextMaintenance: '2025-01-30',
  },
];

const PrestadorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [hasIncident, setHasIncident] = useState<boolean | null>(null);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Panel del Prestador
            </h1>
            <p className="text-muted-foreground">
              {user?.organization} - {user?.position}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Última actualización: {new Date().toLocaleString('es-ES')}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Mis Equipos"
            value={sampleEquipments.length}
            description="Equipos asignados"
            icon={Cpu}
          />
          <StatsCard
            title="Mantenimientos"
            value={3}
            description="Pendientes"
            icon={Wrench}
          />
          <StatsCard
            title="Incidentes"
            value={1}
            description="Reportados"
            icon={AlertTriangle}
          />
          <StatsCard
            title="Capacitaciones"
            value={2}
            description="Completadas este mes"
            icon={FileText}
          />
        </div>

        {/* Incident Question Card */}
        <Card className="card-elevated border-status-pending/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-status-pending/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-status-pending" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    ¿En el mes se presentó un evento ó incidente?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Notificar mensualmente al correo y/o WhatsApp
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={hasIncident === true ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setHasIncident(true)}
                  className={hasIncident === true ? 'sidebar-gradient' : ''}
                >
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Sí
                </Button>
                <Button
                  variant={hasIncident === false ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setHasIncident(false)}
                  className={hasIncident === false ? 'sidebar-gradient' : ''}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  No
                </Button>
                {hasIncident !== null && (
                  <Badge variant="secondary" className="ml-2 animate-fade-in">
                    {hasIncident ? 'Incidente reportado' : 'Sin incidentes'}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Charts */}
        <EquipmentChart />

        {/* Equipment Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Mis Equipos</h2>
            <Badge variant="outline">{sampleEquipments.length} equipos</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleEquipments.map((equipment, index) => (
              <div
                key={equipment.id}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <EquipmentCard equipment={equipment} />
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Próximos Mantenimientos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleEquipments
                    .filter((eq) => eq.status === 'pending' || new Date(eq.nextMaintenance) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
                    .slice(0, 4)
                    .map((equipment, index) => (
                      <div
                        key={equipment.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 animate-slide-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <Cpu className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium text-foreground">{equipment.name}</p>
                            <p className="text-sm text-muted-foreground">{equipment.location}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {new Date(equipment.nextMaintenance).toLocaleDateString('es-ES')}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <ActivityCalendar />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PrestadorDashboard;
