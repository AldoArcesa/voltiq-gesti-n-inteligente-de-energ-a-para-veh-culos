import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { fleetVehicles } from '@/lib/mock-data-energy';
import { toast } from 'sonner';
export function FleetPage() {
  const handleExport = () => {
    // In a real app, this would trigger a download from an API endpoint or use a library like papaparse.
    toast.success('Exportando reporte de flota como CSV...');
  };
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-8">
        <div className="py-8 md:py-10 lg:py-12 space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold font-display tracking-tight text-foreground sm:text-5xl">
                Gestión de Flota
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Supervisa el rendimiento y estado de todos los vehículos de tu empresa.
              </p>
            </div>
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" /> Exportar a CSV
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Estado de la Flota en Tiempo Real</CardTitle>
              <CardDescription>Mostrando {fleetVehicles.length} vehículos activos.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehículo</TableHead>
                    <TableHead>Conductor</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Consumo (L/100km)</TableHead>
                    <TableHead className="text-right">Alertas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fleetVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.name}</TableCell>
                      <TableCell>{vehicle.driver}</TableCell>
                      <TableCell>
                        <Badge variant={vehicle.status === 'En Ruta' ? 'default' : 'outline'}>
                          {vehicle.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{vehicle.kpi}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={vehicle.alerts > 0 ? 'destructive' : 'secondary'}>
                          {vehicle.alerts}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}