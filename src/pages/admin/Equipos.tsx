import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/DataTable';
import { EstadoBadge } from '@/components/EstadoBadge';
import { useEquipos, Equipo } from '@/hooks/useEquipos';
import { Cpu, Plus, Search, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const EquiposAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: equipos, isLoading, refetch } = useEquipos();

  const filteredEquipos = equipos?.filter(equipo =>
    equipo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    equipo.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    equipo.modelo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    equipo.ubicacion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: 'nombre', header: 'Nombre' },
    { key: 'tipo', header: 'Tipo' },
    { key: 'modelo', header: 'Modelo', render: (item: Equipo) => item.modelo || '-' },
    { key: 'fabricante', header: 'Fabricante', render: (item: Equipo) => item.fabricante || '-' },
    { key: 'ubicacion', header: 'Ubicación', render: (item: Equipo) => item.ubicacion || '-' },
    { 
      key: 'estado', 
      header: 'Estado', 
      render: (item: Equipo) => <EstadoBadge estado={item.estado} />
    },
    { 
      key: 'proximo_mantenimiento', 
      header: 'Próx. Mantenimiento',
      render: (item: Equipo) => item.proximo_mantenimiento 
        ? format(new Date(item.proximo_mantenimiento), 'dd/MM/yyyy', { locale: es })
        : '-'
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Cpu className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Gestión de Equipos</h1>
              <p className="text-muted-foreground">Administre todos los equipos médicos</p>
            </div>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Equipo
          </Button>
        </div>

        <Card className="card-elevated">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Listado de Equipos</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar equipos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="icon" onClick={() => refetch()}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={filteredEquipos}
              isLoading={isLoading}
              emptyMessage="No hay equipos registrados"
              onRowClick={(equipo) => console.log('Ver equipo:', equipo.id)}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EquiposAdmin;
