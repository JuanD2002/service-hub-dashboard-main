import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  date: Date;
  type: 'maintenance' | 'calibration' | 'training' | 'report';
}

const sampleActivities: Activity[] = [
  { id: '1', title: 'Mantenimiento preventivo - Equipo X', date: new Date(2024, 11, 26), type: 'maintenance' },
  { id: '2', title: 'Calibración anual', date: new Date(2024, 11, 28), type: 'calibration' },
  { id: '3', title: 'Capacitación Tecnovigilancia', date: new Date(2024, 11, 30), type: 'training' },
  { id: '4', title: 'Reporte trimestral', date: new Date(2025, 0, 5), type: 'report' },
];

const typeColors = {
  maintenance: 'bg-primary text-primary-foreground',
  calibration: 'bg-status-pending text-foreground',
  training: 'bg-status-active text-primary-foreground',
  report: 'bg-accent text-accent-foreground',
};

const typeLabels = {
  maintenance: 'Mantenimiento',
  calibration: 'Calibración',
  training: 'Capacitación',
  report: 'Reporte',
};

export const ActivityCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDateActivities = sampleActivities.filter(
    (activity) =>
      date &&
      activity.date.toDateString() === date.toDateString()
  );

  const hasActivities = (day: Date) => {
    return sampleActivities.some(
      (activity) => activity.date.toDateString() === day.toDateString()
    );
  };

  return (
    <Card className="card-elevated">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CalendarDays className="h-5 w-5 text-primary" />
          Actividades Pendientes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border pointer-events-auto"
          modifiers={{
            hasActivity: (day) => hasActivities(day),
          }}
          modifiersStyles={{
            hasActivity: {
              fontWeight: 'bold',
              backgroundColor: 'hsl(var(--primary) / 0.1)',
              borderRadius: '50%',
            },
          }}
        />
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            {date ? date.toLocaleDateString('es-ES', { dateStyle: 'long' }) : 'Selecciona una fecha'}
          </h4>
          {selectedDateActivities.length > 0 ? (
            <div className="space-y-2">
              {selectedDateActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-2 p-2 rounded-lg bg-muted/50 animate-fade-in"
                >
                  <Badge className={typeColors[activity.type]} variant="secondary">
                    {typeLabels[activity.type]}
                  </Badge>
                  <span className="text-sm">{activity.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No hay actividades programadas
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
