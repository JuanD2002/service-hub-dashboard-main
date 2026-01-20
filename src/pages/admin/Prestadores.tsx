import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/DataTable';
import { usePrestadores, Profile } from '@/hooks/useProfiles';
import { Users, Plus, Search, RefreshCw } from 'lucide-react';

const Prestadores: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: prestadores, isLoading, refetch } = usePrestadores();

  const filteredPrestadores = prestadores?.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.organization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: 'name', header: 'Nombre' },
    { key: 'email', header: 'Email' },
    { key: 'organization', header: 'Organización', render: (item: Profile) => item.organization || '-' },
    { key: 'position', header: 'Cargo', render: (item: Profile) => item.position || '-' },
    { 
      key: 'status', 
      header: 'Estado', 
      render: (item: Profile) => (
        <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
          {item.status === 'active' ? 'Activo' : 'Inactivo'}
        </Badge>
      )
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Prestadores</h1>
              <p className="text-muted-foreground">Gestión de prestadores de servicios</p>
            </div>
          </div>
          <Button className="gap-2"><Plus className="h-4 w-4" />Nuevo Prestador</Button>
        </div>
        <Card className="card-elevated">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Listado de Prestadores</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="icon" onClick={() => refetch()}><RefreshCw className="h-4 w-4" /></Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={filteredPrestadores} isLoading={isLoading} emptyMessage="No hay prestadores registrados" />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Prestadores;